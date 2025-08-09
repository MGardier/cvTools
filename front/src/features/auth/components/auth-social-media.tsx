import { GitHubLogo } from "@/shared/components/logo/github-logo";
import { GoogleLogo } from "@/shared/components/logo/google-logo";
import { Button } from "@/shared/components/ui/button";

export const AuthSocialMedia = () => {
  return (
    <div className="flex  lg:flex-row  md:flex-row flex-col  gap-4 items-center justify-center">
      <Button
        variant="outline"
        className="w-full lg:max-w-min md:max-w-min"
        size="form"
      >
        <GitHubLogo size={22} />
        Connexion avec Github
      </Button>
      <Button
        variant="outline"
        className="w-full lg:max-w-min md:max-w-min"
        size="form"
      >
        <GoogleLogo size={22} />
        Connexion avec Google
      </Button>
    </div>
  );
};
