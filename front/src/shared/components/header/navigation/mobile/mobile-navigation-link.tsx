import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import type { LinkItemInterface } from "@/shared/interfaces/routing/link-item.interface";
import { cn } from "@/shared/utils/utils";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export interface MobileNavigationLinkProps
  extends ComponentPropsWithoutRef<"a"> {
  linkItem: LinkItemInterface;
  className?: string;
}

export const MobileNavigationLink = forwardRef<
  HTMLAnchorElement,
  MobileNavigationLinkProps
>(({ linkItem, className, ...props }, ref) => {
  const IconComponent = linkItem.icon;
  return (
    <DropdownMenuItem key={linkItem.title} asChild>
      <a
        ref={ref}
        href={linkItem.link}
        className={cn("flex items-center space-x-3 cursor-pointer", className)}
        {...props}
      >
        <IconComponent className="h-4 w-4" />
        <div className="flex flex-col space-y-1">
          <span className="font-medium">{linkItem.title}</span>
          {linkItem.description && (
            <span className="text-xs text-muted-foreground line-clamp-1">
              {linkItem.description}
            </span>
          )}
        </div>
      </a>
    </DropdownMenuItem>
  );
});
