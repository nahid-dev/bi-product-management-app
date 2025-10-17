import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary - Green (main action buttons)
        default: "bg-green text-light hover:bg-green/90 focus-visible:ring-green shadow-lg hover:shadow-xl",
        
        // Secondary - Beige (secondary actions)
        secondary: "bg-beige text-dark hover:bg-beige/90 focus-visible:ring-beige shadow-lg hover:shadow-xl",
        
        // Outline - Beige border
        outline: "border border-beige text-dark hover:bg-beige/10 focus-visible:ring-beige",
        
        // Ghost - Transparent with hover
        ghost: "text-light hover:text-beige hover:bg-beige/10 focus-visible:ring-beige",
        
        // Destructive - Red (delete actions)
        destructive: "bg-red text-light hover:bg-red/90 focus-visible:ring-red shadow-lg hover:shadow-xl",
        
        // Link - Text link style
        link: "text-green hover:text-green/80 underline-offset-4 hover:underline focus-visible:ring-green",
        
        // Dark - Dark navy background
        dark: "bg-dark text-light hover:bg-dark/90 focus-visible:ring-dark shadow-lg hover:shadow-xl",
        
        // Light - Light background with dark text
        light: "bg-light text-dark hover:bg-light/90 focus-visible:ring-light shadow-lg hover:shadow-xl",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
        icon: "size-10 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
