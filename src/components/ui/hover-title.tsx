
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface HoverTitleProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  openDelay?: number;
  closeDelay?: number;
}

const HoverTitle = ({
  title,
  description,
  children,
  className,
  contentClassName,
  side = "top",
  align = "center",
  openDelay = 300,
  closeDelay = 300,
}: HoverTitleProps) => {
  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardTrigger asChild className={cn("cursor-help", className)}>
        <span>{children}</span>
      </HoverCardTrigger>
      <HoverCardContent 
        side={side}
        align={align}
        className={cn("w-80 text-sm", contentClassName)}
      >
        <div className="space-y-1">
          <h4 className="font-medium">{title}</h4>
          {description && (
            <p className="text-muted-foreground text-xs">{description}</p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export { HoverTitle };
