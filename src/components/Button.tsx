import React from "react";

type ButtonVariant = "primary" | "secondary" | "accent";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-primary-500 text-neutral-50 hover:bg-gradient-to-b hover:from-accent-400 hover:to-primary-700",
    secondary:
      "bg-neutral-100 text-neutral-900 hover:bg-gradient-to-b hover:from-neutral-100 hover:to-neutral-500",
    accent:
      "bg-accent-400 text-neutral-50 hover:bg-gradient-to-t hover:from-accent-400 hover:to-primary-700",
  };

  return (
    <button
          className={`btn ${variantStyles[variant]} hover:from-40% leading-8 font-medium hover:cursor-pointer py-2 px-4 rounded-xl flex items-center justify-center transition-colors ease-in-out duration-300  ${props.className || ""} flex shrink-0 gap-2`}
      {...props}
    >
      {children}
    </button>
  );
}