import {
  Sparkles,
  Zap,
  Droplet,
  Scissors,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

export type TreatmentCategory =
  | 'Anti-Aging'
  | 'Acne & Scars'
  | 'Laser & Glow'
  | 'Hair Restoration';

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  category: TreatmentCategory;
  summary: string;
  duration: string;
  downtime: string;
  image: string;
  howItWorks: string;
  expectedResults: string;
  sessions: string;
  price: string;
}

export const treatments: Treatment[] = [
  {
    id: 'botox',
    slug: 'neuromodulator-rejuvenation',
    title: 'Neuromodulator Rejuvenation',
    category: 'Anti-Aging',
    summary:
      'Precision-administered relaxants that soften dynamic lines while preserving natural expression.',
    duration: '20 min',
    downtime: 'None',
    image: '/images/neuromodulator.jpg',
    howItWorks:
      'Micro-injections of purified protein temporarily relax targeted facial muscles, preventing the repetitive contractions that etch lines into the skin over time.',
    expectedResults:
      'Smoother forehead, softened crow\u2019s feet, and a refreshed brow arch visible within 4\u20137 days, lasting 3\u20134 months.',
    sessions: '1 session, quarterly',
    price: 'From $380',
  },
  {
    id: 'dermal-filler',
    slug: 'dermal-contour-filler',
    title: 'Dermal Contour Filler',
    category: 'Anti-Aging',
    summary:
      'Hyaluronic acid volumizing to restore youthful contours, define lips, and lift deep folds.',
    duration: '45 min',
    downtime: '1\u20132 days',
    image: '/images/filler.jpg',
    howItWorks:
      'Cross-linked hyaluronic acid gel is layered along natural anatomical planes to replace lost volume and re-sculpt facial architecture with a cannula technique.',
    expectedResults:
      'Immediate lift and plumpness; final settled result at 2 weeks lasting 9\u201318 months depending on area.',
    sessions: '1 session, maintained yearly',
    price: 'From $650',
  },
  {
    id: 'microneedling',
    slug: 'rf-microneedling',
    title: 'RF Microneedling',
    category: 'Anti-Aging',
    summary:
      'Radiofrequency energy delivered through fine needles to tighten skin and rebuild collagen.',
    duration: '60 min',
    downtime: '2\u20133 days',
    image: '/images/microneedling.jpg',
    howItWorks:
      'Insulated needles penetrate to precise depths, releasing fractionated thermal energy that triggers a controlled wound-healing cascade and neocollagenesis.',
    expectedResults:
      'Progressive tightening, refined pores, and improved elasticity over 3\u20136 months. Series of 3 recommended.',
    sessions: '3 sessions, 6 wks apart',
    price: 'From $420',
  },
  {
    id: 'acne-peel',
    slug: 'medical-acne-resurfacing-peel',
    title: 'Medical Acne Resurfacing Peel',
    category: 'Acne & Scars',
    summary:
      'A layered chemical peel protocol calibrated to active acne, oil control, and post-acne marks.',
    duration: '40 min',
    downtime: '3\u20135 days',
    image: '/images/acne-peel.jpg',
    howItWorks:
      'A blend of salicylic, glycolic, and retinoic acid exfoliates the stratum corneum, unclogs follicles, and normalizes keratinization to break the acne cycle.',
    expectedResults:
      'Reduced breakouts, faded hyperpigmentation, and smoother texture. Full clarity after a 4-treatment series.',
    sessions: '4 sessions, 2 wks apart',
    price: 'From $240',
  },
  {
    id: 'scar-subcision',
    slug: 'scar-subcision-and-filler',
    title: 'Scar Subcision & Filler',
    category: 'Acne & Scars',
    summary:
      'Releasing tethered acne scars and elevating depressions with a combined subcision-filler method.',
    duration: '50 min',
    downtime: '5\u20137 days',
    image: '/images/scar-subcision.jpg',
    howItWorks:
      'A blunt cannula sweeps beneath fibrous scar bands to release them, followed by low-viscosity filler placed to support the released skin from re-tethering.',
    expectedResults:
      'Visible leveling of boxcar and rolling scars after 1\u20132 sessions; continued improvement with collagen remodeling.',
    sessions: '1\u20132 sessions',
    price: 'From $590',
  },
  {
    id: 'pico-laser',
    slug: 'pico-laser-toning',
    title: 'Pico Laser Toning',
    category: 'Laser & Glow',
    summary:
      'Picosecond laser for pigmentation, melasma, and an overall luminous, even-toned complexion.',
    duration: '30 min',
    downtime: 'Minimal',
    image: '/images/pico-laser.jpg',
    howItWorks:
      'Ultra-short picosecond pulses shatter pigment particles into dust-sized fragments that the body\u2019s immune system clears naturally, with minimal thermal damage.',
    expectedResults:
      'Faded dark spots, refined texture, and a glass-skin glow. Series of 5\u20136 sessions at 2-week intervals.',
    sessions: '5\u20136 sessions',
    price: 'From $310',
  },
  {
    id: 'hydrafacial',
    slug: 'signature-hydraglow-facial',
    title: 'Signature HydraGlow Facial',
    category: 'Laser & Glow',
    summary:
      'Multi-step cleanse, exfoliation, extraction, and serum infusion for an instant red-carpet glow.',
    duration: '50 min',
    downtime: 'None',
    image: '/images/hydrafacial.jpg',
    howItWorks:
      'A vortex-fusion device simultaneously cleanses, exfoliates, extracts impurities, and infuses tailored serums of antioxidants and peptides into freshly opened skin.',
    expectedResults:
      'Immediate radiance, dewy hydration, and decongested pores with zero downtime. Monthly maintenance recommended.',
    sessions: 'Single / monthly',
    price: 'From $180',
  },
  {
    id: 'prp-hair',
    slug: 'prp-hair-restoration',
    title: 'PRP Hair Restoration',
    category: 'Hair Restoration',
    summary:
      'Platelet-rich plasma from your own blood, reinjected to awaken dormant follicles and thicken hair.',
    duration: '60 min',
    downtime: '1 day',
    image: '/images/prp-hair.jpg',
    howItWorks:
      'A small blood draw is centrifuged to isolate concentrated platelets and growth factors, which are injected into the scalp to stimulate follicular stem-cell activity.',
    expectedResults:
      'Reduced shedding within 6 weeks; visible thickening and new growth at 3\u20136 months. Series of 4\u20136 sessions.',
    sessions: '4\u20136 sessions',
    price: 'From $490',
  },
  {
    id: 'fue-transplant',
    slug: 'fue-hair-transplant',
    title: 'FUE Hair Transplant',
    category: 'Hair Restoration',
    summary:
      'Follicular unit extraction for natural, permanent restoration of receding hairlines and crown density.',
    duration: '4\u20136 hrs',
    downtime: '7\u201310 days',
    image: '/images/fue-transplant.jpg',
    howItWorks:
      'Individual follicular units are harvested from the donor zone and artistically implanted at the correct angle and density to recreate a natural growth pattern.',
    expectedResults:
      'Transplanted hair sheds then regrows permanently from 4 months, with full density at 12\u201315 months.',
    sessions: '1 procedure',
    price: 'From $5,400',
  },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export interface BeforeAfter {
  id: string;
  concern: 'Pigmentation' | 'Acne Scars' | 'Wrinkles';
  before: string;
  after: string;
  sessions: number;
  timeframe: string;
  procedure: string;
}

export const beforeAfters: BeforeAfter[] = [
  {
    id: 'ba-1',
    concern: 'Pigmentation',
    before: '/images/ba-before-1.jpg',
    after: '/images/ba-after-1.jpg',
    sessions: 3,
    timeframe: '6 Weeks',
    procedure: 'Q-Switched Laser',
  },
  {
    id: 'ba-2',
    concern: 'Acne Scars',
    before: '/images/ba-before-2.jpg',
    after: '/images/ba-after-2.jpg',
    sessions: 4,
    timeframe: '10 Weeks',
    procedure: 'RF Microneedling',
  },
  {
    id: 'ba-3',
    concern: 'Wrinkles',
    before: '/images/ba-before-3.jpg',
    after: '/images/ba-after-3.jpg',
    sessions: 2,
    timeframe: '4 Weeks',
    procedure: 'Neuromodulator + Filler',
  },
  {
    id: 'ba-4',
    concern: 'Pigmentation',
    before: '/images/ba-before-1.jpg',
    after: '/images/ba-after-4.jpg',
    sessions: 5,
    timeframe: '12 Weeks',
    procedure: 'Pico Laser Toning',
  },
];

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  credentials: string;
  image: string;
  specialties: string[];
  bio: string;
  longBio: string;
}

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    slug: 'dr-amara-laurent',
    name: 'Dr. Amara Laurent',
    title: 'Medical Director & Cosmetic Dermatologist',
    credentials: 'MD, FAAD \u2014 Harvard Fellowship',
    image: '/images/doctor-1.jpg',
    specialties: ['Laser Dermatology', 'Anti-Aging', 'Pigmentation'],
    bio: 'With over a decade of experience and a Harvard fellowship, Dr. Laurent leads Lumière\u2019s clinical vision, blending evidence-based medicine with an artist\u2019s eye for natural results.',
    longBio:
      'Dr. Amara Laurent is the founding Medical Director of Lumière Dermatology & Aesthetics. After completing her dermatology residency at Massachusetts General Hospital and a fellowship in cosmetic and laser dermatology at Harvard Medical School, she spent five years at a leading aesthetic practice in Paris before establishing Lumière. Her philosophy centers on personalized, progressive care \u2014 enhancing each patient\u2019s natural features rather than reshaping them. She has published over 30 peer-reviewed papers on laser safety across skin tones and serves on the editorial board of the Journal of Cosmetic Dermatology.',
  },
  {
    id: 'doc-2',
    slug: 'dr-sofia-marchetti',
    name: 'Dr. Sofia Marchetti',
    title: 'Dermatologic Surgeon',
    credentials: 'MD, MS \u2014 Johns Hopkins',
    image: '/images/doctor-2.jpg',
    specialties: ['Scar Revision', 'Hair Restoration', 'Skin Cancer'],
    bio: 'Dr. Marchetti specializes in precise surgical and laser techniques for scar revision and hair restoration, with a meticulous, minimally invasive philosophy.',
    longBio:
      'Dr. Sofia Marchetti brings a surgeon\u2019s precision to aesthetic dermatology. She earned her MD and MS in clinical investigation at Johns Hopkins, followed by a surgical dermatology fellowship focused on scar revision and hair transplantation. At Lumière, she leads the FUE hair transplant program and the scar revision clinic, combining advanced surgical techniques with laser-assisted protocols. Her patients value her calm, detail-oriented approach and her commitment to outcomes that look entirely natural.',
  },
  {
    id: 'doc-3',
    slug: 'dr-elena-vance',
    name: 'Dr. Elena Vance',
    title: 'Aesthetic & Laser Specialist',
    credentials: 'MD \u2014 Stanford Dermatology',
    image: '/images/doctor-3.jpg',
    specialties: ['Laser & Glow', 'Acne', 'Preventative Aging'],
    bio: 'Dr. Vance is renowned for her bespoke laser protocols and preventative approach, helping patients achieve luminous, healthy skin at every age.',
    longBio:
      'Dr. Elena Vance specializes in preventative and laser dermatology, helping patients maintain radiant, healthy skin throughout every decade of life. Trained at Stanford, she developed proprietary multi-modal laser protocols that address pigmentation, texture, and tone in a single session. She is particularly sought after for her work with melanin-rich skin, where standard laser settings often fall short. Dr. Vance believes that great skin is a lifelong practice, not a single procedure, and she builds long-term relationships with each patient.',
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export interface Testimonial {
  id: string;
  name: string;
  procedure: string;
  image: string;
  quote: string;
  duration: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Isabella R.',
    procedure: 'Pico Laser Toning',
    image: '/images/testimonial-1.jpg',
    quote: 'My melasma faded completely in three sessions. I finally leave the house without foundation.',
    duration: '0:42',
  },
  {
    id: 't-2',
    name: 'Marcus T.',
    procedure: 'PRP Hair Restoration',
    image: '/images/testimonial-2.jpg',
    quote: 'My crown filled in visibly by month four. The team made the whole process effortless.',
    duration: '0:58',
  },
  {
    id: 't-3',
    name: 'Priya S.',
    procedure: 'RF Microneedling',
    image: '/images/testimonial-3.jpg',
    quote: 'My acne scars are nearly invisible now. I didn\u2019t think it was possible.',
    duration: '0:36',
  },
  {
    id: 't-4',
    name: 'Sophie L.',
    procedure: 'Signature HydraGlow Facial',
    image: '/images/testimonial-4.jpg',
    quote: 'The glow lasts for weeks. I book one before every major event now.',
    duration: '0:29',
  },
];

export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  procedure: string;
}

export const reviews: Review[] = [
  {
    id: 'r-1',
    name: 'Juliana M.',
    date: '2 weeks ago',
    rating: 5,
    procedure: 'Dermal Contour Filler',
    text: 'Dr. Laurent has the most natural eye. My results look like me on my best day \u2014 refreshed, never overdone. The clinic itself feels like a five-star spa.',
  },
  {
    id: 'r-2',
    name: 'David K.',
    date: '1 month ago',
    rating: 5,
    procedure: 'FUE Hair Transplant',
    text: 'I researched for two years before choosing Lumière. The density at month ten exceeded my expectations. Genuinely life-changing.',
  },
  {
    id: 'r-3',
    name: 'Aisha B.',
    date: '1 month ago',
    rating: 5,
    procedure: 'Acne Resurfacing Peel',
    text: 'After years of struggling, my skin is finally clear. The team built a real plan for me, not just a one-off treatment. So grateful.',
  },
  {
    id: 'r-4',
    name: 'Christine W.',
    date: '2 months ago',
    rating: 5,
    procedure: 'Pico Laser Toning',
    text: 'The pigmentation that bothered me for a decade is gone. Every visit was calm, precise, and genuinely caring. Worth every penny.',
  },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const faqs: FAQItem[] = [
  {
    q: 'Is my consultation really free?',
    a: 'Yes. Your first 30-minute consultation with a Lumière specialist is complimentary. We assess your skin, discuss your goals, and build a tailored plan \u2014 with zero obligation to proceed.',
  },
  {
    q: 'Are the treatments painful?',
    a: 'Comfort is central to our protocol. Most treatments involve only mild sensation, and we offer medical-grade numbing for deeper procedures. Your specialist will walk you through every sensation beforehand.',
  },
  {
    q: 'How soon will I see results?',
    a: 'It depends on the treatment. Facials deliver instant radiance, while laser and collagen-stimulating procedures show progressive improvement over weeks to months. We set a clear timeline at your consultation.',
  },
  {
    q: 'Is there downtime?',
    a: 'Many of our signature treatments have zero downtime. For procedures with recovery, we provide a detailed aftercare kit and schedule. We never recommend a treatment that conflicts with your life.',
  },
  {
    q: 'Do you treat all skin types and tones?',
    a: 'Absolutely. Our lasers and protocols are calibrated for the full Fitzpatrick spectrum. Treating rich melanin safely is a specialty of our clinic \u2014 we use devices and settings designed for deeper skin tones.',
  },
];

export interface ChatPrompt {
  icon: LucideIcon;
  label: string;
  reply: string;
}

export const chatPrompts: ChatPrompt[] = [
  {
    icon: Sparkles,
    label: 'Book a Treatment',
    reply:
      'I\u2019d love to help you book. Could you share the treatment you\u2019re interested in and your preferred date? You can also tap the \u201cBook Consultation\u201d button in the header to grab a slot instantly.',
  },
  {
    icon: Zap,
    label: 'Check Pricing',
    reply:
      'Treatment pricing begins at $180 for our HydraGlow Facial and ranges up to $5,400 for a full FUE transplant. After your free consultation we provide an exact, personalized quote \u2014 no surprises.',
  },
  {
    icon: Droplet,
    label: 'Which treatment suits me?',
    reply:
      'Tell me your main skin concern \u2014 aging, acne, pigmentation, or hair \u2014 and I\u2019ll suggest the right starting point. You can also browse the Treatments directory above to compare options.',
  },
  {
    icon: Stethoscope,
    label: 'Talk to a Skin Specialist',
    reply:
      'Our specialists are available for a free 30-minute consultation. Tap \u201cBook Consultation\u201d in the header, or leave your number and we\u2019ll call you back the same business day.',
  },
  {
    icon: Scissors,
    label: 'Recovery & Aftercare',
    reply:
      'Most of our treatments have minimal to no downtime. For those with recovery, you\u2019ll receive a personalized aftercare kit and a day-by-day guide. Want me to flag the downtime for a specific treatment?',
  },
];
