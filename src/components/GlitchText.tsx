import { FC, CSSProperties } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-shadow': string;
  '--before-shadow': string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-shadow': enableShadows ? '-3px 0 red' : 'none',
    '--before-shadow': enableShadows ? '3px 0 cyan' : 'none',
  };

  const baseClasses =
    'text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer';

  const pseudoClasses = enableOnHover
    ? "after:content-[''] after:absolute after:top-0 after:left-[4px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-4px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] ' +
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)]'
    : '';

  const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`;

  return (
    <div
      style={inlineStyles}
      data-text={children}
      className={combinedClasses}
    >
      {children}
    </div>
  );
};

export default GlitchText;