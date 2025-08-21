import { GitHubLogo } from "@/components/logo/github-logo";
import { GoogleLogo } from "@/components/logo/google-logo";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const AuthSocialMedia = () => {

    const { t } = useTranslation('auth');
  return (
    <div className="flex  lg:flex-row  md:flex-row flex-col  gap-4 items-center justify-center">
      <Button
        variant="outline"
        className="w-full lg:max-w-min md:max-w-min"
        size="form"
      >
        <GitHubLogo size={22} />
         {t("pages.socialMedia.github")}
      </Button>
      <Button
        variant="outline"
        className="w-full lg:max-w-min md:max-w-min"
        size="form"
      >
        <GoogleLogo size={22} />
         {t("pages.socialMedia.google")}
      </Button>
    </div>
  );
};
