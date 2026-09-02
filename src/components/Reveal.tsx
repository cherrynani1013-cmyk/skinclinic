import { type ReactNode, type ElementType } from 'react';
import { useReveal } from '@/hooks/useReveal';

type AnimationType =
  | 'animate-fade-up'
  | 'animate-fade-right'
  | 'animate-fade-left'
  | 'animate-scale-fade'
  | 'animate-reveal-up';

interface RevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  as?: ElementType;
  className?: string;
}

export default function Reveal({
  children,
  animation = 'animate-fade-up',
  delay = 0,
  as: Tag = 'div',
  className = '',
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`${visible ? animation : 'reveal-hidden'} ${className}`}
      style={{ animationDelay: visible ? `${delay}s` : undefined }}
    >
      {children}
    </Tag>
  );
}
