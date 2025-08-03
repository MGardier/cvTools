import { NavigationMenuLink } from "@/shared/components/ui/navigation-menu";
import { cn } from "@/shared/libs/utils";
import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

export interface DesktopNavigationItemProps {
  title: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  className?: string;
}

export const DesktopNavigationItem = forwardRef<
  HTMLAnchorElement,
  DesktopNavigationItemProps
>(
  (
    { className, title, description, href, icon: IconComponent, ...props },
    ref
  ) => {
    return (
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <IconComponent className="h-4 w-4" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          {description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    );
  }
);

DesktopNavigationItem.displayName = "DesktopNavigationItem";
