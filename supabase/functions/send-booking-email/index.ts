import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import nodemailer from "npm:nodemailer@6.9.15";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  treatment: string;
  preferred_date: string;
  notes: string | null;
  status: string;
  email_sent: boolean;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailAppPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if the caller is authenticated (admin) or anonymous (booking form)
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    let isAuthenticated = false;

    if (token) {
      const { data: userData } = await supabase.auth.getUser(token);
      isAuthenticated = !!(userData && userData.user);
    }

    const { bookingId } = await req.json();
    if (!bookingId) {
      return new Response(
        JSON.stringify({ success: false, error: "bookingId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch booking with service role (bypasses RLS)
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .maybeSingle<Booking>();

    if (bookingError || !booking) {
      return new Response(
        JSON.stringify({ success: false, error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Security: unauthenticated callers (booking form) can only send
    // for bookings created in the last 5 minutes, and only if no email
    // has been sent yet. Admins can send for any booking.
    if (!isAuthenticated) {
      const createdAt = new Date(booking.created_at).getTime();
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      if (createdAt < fiveMinutesAgo) {
        return new Response(
          JSON.stringify({ success: false, error: "Unauthorized for this booking" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (booking.email_sent) {
        return new Response(
          JSON.stringify({ success: false, error: "Email already sent for this booking" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (!gmailUser || !gmailAppPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Gmail credentials are not configured. Please add GMAIL_USER and GMAIL_APP_PASSWORD to your project secrets.",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const formattedDate = new Date(booking.preferred_date).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const subject = "Your Lumière Dermatology Consultation — Thank You!";
    const htmlBody = `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f4f0e8;">
        <div style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          <div style="background-color: #1a1a1a; padding: 30px 40px; text-align: center;">
            <h1 style="color: #d4af37; font-size: 28px; margin: 0; font-style: italic;">Lumière Dermatology</h1>
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin-top: 8px; text-transform: uppercase; letter-spacing: 2px;">Luxury Clinical Dermatology</p>
          </div>

          <div style="padding: 40px;">
            <h2 style="color: #1a1a1a; font-size: 22px; margin-bottom: 20px;">Dear ${booking.full_name},</h2>

            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
              Thank you for choosing Lumière Dermatology. We have received your consultation request and our team will contact you within one business day to confirm your appointment.
            </p>

            <div style="background-color: #f4f0e8; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <h3 style="color: #1a1a1a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">Your Request Details</h3>
              <table style="width: 100%; font-size: 15px; color: #4a4a4a;">
                <tr><td style="padding: 6px 0; font-weight: 600; color: #1a1a1a; width: 140px;">Treatment:</td><td style="padding: 6px 0;">${booking.treatment}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: 600; color: #1a1a1a;">Preferred Date:</td><td style="padding: 6px 0;">${formattedDate}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: 600; color: #1a1a1a;">Contact:</td><td style="padding: 6px 0;">${booking.email} / ${booking.phone}</td></tr>
              </table>
            </div>

            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
              If you need to reschedule or have any questions, please don't hesitate to contact us at <strong>care@lumiere.derm</strong> or <strong>+44 20 7123 4567</strong>.
            </p>

            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7;">
              We look forward to helping you achieve your healthiest, most radiant skin.
            </p>

            <p style="color: #1a1a1a; font-size: 16px; line-height: 1.7; margin-top: 28px;">
              Warm regards,<br/>
              <span style="font-style: italic; color: #6b7b68;">The Lumière Dermatology Team</span><br/>
              <span style="font-size: 13px; color: #888;">128 Harley Street, London W1G 7JR</span>
            </p>
          </div>

          <div style="background-color: #f4f0e8; padding: 20px 40px; text-align: center;">
            <p style="color: #999; font-size: 11px; margin: 0;">This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    `;

    // Configure Gmail SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `Lumière Dermatology <${gmailUser}>`,
      to: booking.email,
      subject,
      html: htmlBody,
    });

    // Mark email as sent in the database
    await supabase
      .from("bookings")
      .update({ email_sent: true })
      .eq("id", bookingId);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Confirmation email sent to ${booking.email}`,
        messageId: info.messageId,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Internal server error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
