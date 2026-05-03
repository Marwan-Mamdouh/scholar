import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link, { type LinkProps } from "next/link";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "danger"
  | "primary-outline"
  | "accent-outline"
  | "secondary-outline"
  | "danger-outline"
  | "primary-link"
  | "accent-link"
  | "secondary-link"
  | "danger-link";

type CommonButtonProps = {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
};

type NativeButtonProps = CommonButtonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof CommonButtonProps | "className"
  > & {
    href?: undefined;
  };

type ButtonLinkProps = CommonButtonProps &
  LinkProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CommonButtonProps | keyof LinkProps | "className" | "type"
  > & {
    href: LinkProps["href"];
    type?: never;
  };

export type ButtonProps = NativeButtonProps | ButtonLinkProps;

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "min-w-29 bg-primary-500 text-neutral-50 hover:bg-[linear-gradient(180deg,var(--color-primary-300)_11.06%,var(--color-primary-700)_100%)] focus-visible:outline-primary-300",
  accent:
    "min-w-29 bg-accent-600 text-neutral-50 hover:bg-[linear-gradient(180deg,var(--color-accent-300)_11.06%,var(--color-accent-800)_100%)] focus-visible:outline-accent-300",
  secondary:
    "min-w-29 bg-neutral-100 text-neutral-900 hover:bg-[linear-gradient(180deg,var(--color-neutral-100)_0%,var(--color-neutral-500)_88.94%)] focus-visible:outline-neutral-200",
  danger:
    "min-w-29 bg-danger-300 text-neutral-50 hover:bg-danger-400 focus-visible:outline-danger-300",
  "primary-outline":
    "min-w-29 border-2 border-primary-500 text-primary-500 hover:border-primary-300 hover:text-primary-300 hover:drop-shadow-[0_2px_10px_var(--color-primary-200)] focus-visible:outline-primary-300",
  "accent-outline":
    "min-w-29 border-2 border-accent-400 text-accent-400 hover:border-accent-200 hover:text-accent-200 hover:drop-shadow-[0_2px_10px_var(--color-accent-200)] focus-visible:outline-accent-200",
  "secondary-outline":
    "min-w-29 border-2 border-neutral-200 text-neutral-200 hover:border-neutral-100 hover:text-neutral-100 hover:drop-shadow-[0_2px_10px_var(--color-neutral-100)] focus-visible:outline-neutral-100",
  "danger-outline":
    "min-w-29 border-2 border-danger-200 text-danger-200 hover:border-danger-300 hover:text-danger-300 hover:drop-shadow-[0_2px_10px_var(--color-danger-500)] focus-visible:outline-danger-300",
  "primary-link":
    "text-primary-500 hover:text-primary-300 focus-visible:outline-primary-300",
  "accent-link":
    "text-accent-400 hover:text-accent-200 focus-visible:outline-accent-200",
  "secondary-link":
    "text-neutral-200 hover:text-neutral-100 focus-visible:outline-neutral-100",
  "danger-link":
    "text-danger-200 hover:text-danger-400 focus-visible:outline-danger-400",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  children,
  className,
  icon,
  variant = "primary",
  ...props
}: ButtonProps) {
  const isLinkVariant = variant.endsWith("-link");
  const buttonClassName = cn(
    "inline-flex items-center justify-center rounded-xl font-ui text-btn capitalize transition-all duration-200 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    isLinkVariant ? "h-8 gap-1.5 p-0 hover:gap-4" : "h-12 gap-2 px-3 py-1",
    buttonVariants[variant],
    className,
  );
  const content = (
    <>
      {children ? (
        <span className="flex min-w-0 items-center justify-center text-center">
          {children}
        </span>
      ) : null}
      {icon ? (
        <span
          aria-hidden="true"
          className={cn("h-4 w-4 flex-none", !isLinkVariant && "self-center")}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (props.href != null) {
    const { href, ...linkProps } = props;

    return (
      <Link className={buttonClassName} href={href} {...linkProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button className={buttonClassName} type={type} {...buttonProps}>
      {content}
    </button>
  );
}
