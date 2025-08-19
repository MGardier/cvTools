import { ROUTES } from "@/data/routes";
import { cn } from "@/utils/utils";

export interface AppLogoProps {
  className?: string;
}

export const AppLogo = ({ className }: AppLogoProps) => {
  return (
    <a
      href={ROUTES.home}
      className={cn(
        "flex items-center space-x-1 text-xl font-bold transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className
      )}
      aria-label="Retour à l'accueil CVTools"
    >
      <span className="text-gray-800">CV</span>
      <span className="text-blue-400">Tools</span>
    </a>
  );
};
