import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu";

import type { MenuItemInterface } from "@/shared/interfaces/routing/menu-item.interface";
import { DesktopNavigationItem } from "./desktop-navigation-item";

export interface DeskTopNavigationProps {
  menuItems: MenuItemInterface[];
}

export const DesktopNavigation = ({ menuItems }: DeskTopNavigationProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-2">
        {menuItems.map((menuItem) => (
          <NavigationMenuItem key={menuItem.title}>
            <NavigationMenuTrigger className="text-sm font-medium px-4 py-2">
              {menuItem.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-max gap-3   md:grid-cols-2 ">
                {menuItem.linkItems.map((linkItem) => (
                  <DesktopNavigationItem
                    key={linkItem.title}
                    title={linkItem.title}
                    href={linkItem.link}
                    icon={linkItem.icon}
                    description={linkItem.description}
                  />
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
