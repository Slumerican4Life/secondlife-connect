
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

// Add explicit type checking and additional props
interface HoverCardProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Enhanced version with better prop handling
const EnhancedHoverCard: React.FC<HoverCardProps> = ({ 
  children, 
  openDelay = 300,
  closeDelay = 300,
  defaultOpen,
  open,
  onOpenChange,
}) => (
  <HoverCardPrimitive.Root
    openDelay={openDelay}
    closeDelay={closeDelay}
    defaultOpen={defaultOpen}
    open={open}
    onOpenChange={onOpenChange}
  >
    {children}
  </HoverCardPrimitive.Root>
)

export { EnhancedHoverCard as HoverCard, HoverCardTrigger, HoverCardContent }
