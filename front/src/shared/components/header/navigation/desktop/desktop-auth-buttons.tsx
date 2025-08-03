import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/data/routes";

export const DesktopAuthButtons = () => {
  return (
    <div className="flex items-center space-x-3">
      <Button variant="ghost" size="sm" asChild>
        <a href={ROUTES.auth.signUp}>S'inscrire</a>
      </Button>
      <Button size="sm" variant="blue" asChild>
        <a href={ROUTES.auth.signIn}>Se connecter</a>
      </Button>
    </div>
  );
};
