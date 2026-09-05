import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = '',
  color,
}) => {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        color: color || 'hsl(var(--primary))',
        WebkitTextFillColor: 'currentColor',
        backgroundImage: 'none',
        backgroundClip: 'border-box',
        WebkitBackgroundClip: 'border-box',
        transform: 'none',
        willChange: 'auto',
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;