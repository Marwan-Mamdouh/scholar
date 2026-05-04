import React, { ComponentPropsWithoutRef, ElementType } from 'react';

type IconButtonVariant = "primary" | "secondary" | "accent" | "danger" | "neutral";
type IconButtonSize = "sm" | "md" | "lg" | "xl";
interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
    icon: ElementType;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
}

export default function IconButton({
    icon: Icon,
    variant = "neutral",
    size = "md",
    className = "",
    type = "button",
    ...props
}: IconButtonProps) {

    // 1. Define Color Variants
    const variantStyles: Record<IconButtonVariant, string> = {
        primary: "text-primary-500 hover:text-primary-200 hover:bg-[radial-gradient(circle_at_center,#B3DAF233_0%,transparent_95%)]",
        secondary: "text-neutral-300 hover:text-neutral-100 hover:bg-[radial-gradient(circle_at_center,#BDC3C733_0%,transparent_95%)]",
        accent: "text-accent-600 hover:text-accent-300 hover:bg-[radial-gradient(circle_at_center,#6FBCB733_0%,transparent_95%)]",
        danger: "text-danger-200 hover:text-danger-400 hover:bg-[radial-gradient(circle_at_center,#FF453833_0%,transparent_95%)]",
        neutral: "text-current hover:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,transparent_95%)]",
    };

    const iconSizeStyles: Record<IconButtonSize, string> = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-10 h-10",
    };

    return (
        <button
            type={type}
            className={`
                overflow-hidden
                flex justify-center items-center  
                cursor-pointer 
                transition-all ease-in-out duration-300 
                shrink-0 disabled:opacity-50 disabled:cursor-not-allowed
                ${size == 'sm' || size == 'md' ? 'rounded-xl p-2.5' :'rounded-2xl p-1.5'}
                ${variantStyles[variant]} 
                ${className}
            `.trim()}
            {...props}
        >
            <Icon className={`${iconSizeStyles[size]} z-10`} aria-hidden="true" />
        </button>
    );
}