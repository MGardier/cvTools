import { NAVBAR_MENU_ITEMS } from "@/shared/data/navbar-menu-items";

import { MobileNavigation } from "./mobile/mobile-navigation";
import { DesktopAuthButtons } from "./desktop/desktop-auth-buttons";
import { DesktopNavigation } from "./desktop/desktop-navigation";

export const Navigation = () => {
  return (
    <>
      <nav
        className="hidden lg:flex lg:justify-center"
        role="navigation"
        aria-label="Navigation principale"
      >
        <DesktopNavigation menuItems={NAVBAR_MENU_ITEMS} />
      </nav>

      <div className="hidden lg:flex lg:justify-end">
        <DesktopAuthButtons />
      </div>

      <div className="flex lg:hidden">
        <MobileNavigation menuItems={NAVBAR_MENU_ITEMS} />
      </div>
    </>
  );
};
