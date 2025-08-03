import { AppLogo } from "./app-logo";
import { Navigation } from "./navigation/navigation";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      <div className="w-full px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex h-16 items-center justify-between lg:justify-center lg:grid lg:grid-cols-3 lg:gap-8">
          <AppLogo />
          <Navigation />
        </div>
      </div>
    </header>
  );
};
