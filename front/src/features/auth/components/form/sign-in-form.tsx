import { Card } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";
import { AuthCardContent } from "../auth-card-content";
import { AuthSocialMedia } from "../auth-social-media";
import { AuthField } from "../auth-field";

import { useSignIn } from "../hooks/use-sign-in";
import { ROUTES } from "@/data/routes";



export const SignInForm = () => { 

  const {t,form,onSubmit, isPending} = useSignIn();

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title={t("pages.signIn.title")}>
       {`${t("pages.signIn.hasAccount")} `}
        <a className="font-semibold" href={ROUTES.auth.signUp}>
          {t("pages.signIn.signInLink")}
        </a>
      </AuthCardHeader>


      <AuthCardContent {...{ onSubmit, form , labelButton: t("pages.signIn.form.button"), isLoading : isPending }}>
        <AuthSocialMedia />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Ou
          </span>
        </div>
        <div className="grid gap-6">
          {/** EMAIL  */}
          <AuthField
            label=  {t("pages.signIn.form.email")}
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            {...{ form }}
          />

          {/** PASSWORD  */}
          <AuthField
            label= {t("pages.signIn.form.password")}
            name="password"
            type="password"
            placeholder="••••••••••••"
            required
            {...{ form }}
          />
        
        </div>
      </AuthCardContent>
    </Card>
  );
};
