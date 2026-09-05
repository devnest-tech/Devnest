import React from "react";

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  as?: React.ElementType;
  [key: string]: unknown;
}

const StarBorder: React.FC<StarBorderProps> = ({
  children,
  className = "",
  color = "hsl(var(--primary))",
  thickness = 1,
  as: Component = "div",
  ...rest
}) => {
  return (
    <Component
      className={`relative rounded-xl ${className}`}
      style={{
        border: `${thickness}px solid ${color}`,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default StarBorder;