import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-[#1E3D8F] text-white hover:bg-[#1E3D8F]/90 focus-visible:ring-[#1E3D8F]",
      outline:
        "border border-[#1E3D8F] text-[#1E3D8F] hover:bg-[#1E3D8F]/10 focus-visible:ring-[#1E3D8F]",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";


