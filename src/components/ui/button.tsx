import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-border bg-transparent text-foreground hover:bg-muted hover:border-primary/50",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-lg hover:-translate-y-0.5",
                ghost: "hover:bg-muted hover:text-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                // Glass morphism variants
                glass: "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5",
                "glass-primary": "bg-primary/80 backdrop-blur-xl border border-primary/30 text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
                // Hero button with liquid glass effect
                hero: "relative overflow-hidden bg-gradient-to-r from-secondary via-teal-light to-secondary text-primary font-semibold shadow-[0_8px_32px_hsl(180_60%_45%/0.3)] hover:shadow-[0_12px_40px_hsl(180_60%_45%/0.4)] hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
                // Accent gold button
                accent: "bg-gradient-to-r from-accent to-gold-dark text-accent-foreground hover:shadow-[0_8px_32px_hsl(45_90%_55%/0.3)] hover:-translate-y-0.5",
                // Game button
                game: "bg-gradient-to-br from-primary to-navy-light text-primary-foreground px-6 py-4 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 border border-white/10",
                // Shimmer effect
                shimmer: "relative overflow-hidden bg-primary text-primary-foreground before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
                // Outline glass
                "outline-glass": "border border-white/30 bg-white/5 backdrop-blur-md text-foreground hover:bg-white/10 hover:border-white/50",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 px-4 text-xs",
                lg: "h-12 px-8 text-base",
                xl: "h-14 px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
