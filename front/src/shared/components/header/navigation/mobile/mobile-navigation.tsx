import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { MenuItemInterface } from "@/shared/interfaces/routing/menu-item.interface";
import { Menu } from "lucide-react";
import { MobileNavigationLink } from "./mobile-navigation-link";
import { MobileAuthButton } from "./mobile-auth-buttons";

export interface MobileNavigationProps {
  menuItems: MenuItemInterface[];
}

export const MobileNavigation = ({ menuItems }: MobileNavigationProps) => {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Ouvrir le menu de navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[300px]">
          {menuItems.map((menuItem, menuIndex) => (
            <div key={menuItem.title}>
              {menuIndex > 0 && <DropdownMenuSeparator />}

              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {menuItem.title}
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                {menuItem.linkItems.map((linkItem) => (
                  <MobileNavigationLink linkItem={linkItem} />
                ))}
              </DropdownMenuGroup>
            </div>
          ))}

          <DropdownMenuSeparator />
          <MobileAuthButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
