import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/data/routes";

export const MobileAuthButton = () => {
  return (
    <>
      <DropdownMenuItem asChild>
        <a href={ROUTES.auth.signUp} className="cursor-pointer">
          S'inscrire
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a href={ROUTES.auth.signIn} className="cursor-pointer">
          Se connecter
        </a>
      </DropdownMenuItem>
    </>
  );
};
