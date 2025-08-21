import { Card } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";
import { AuthCardContent } from "../auth-card-content";
import { AuthSocialMedia } from "../auth-social-media";
import { AuthField } from "../auth-field";
import { useSignUp } from "../hooks/use-sign-up";
import { ROUTES } from "@/data/routes";
import { CircleX } from "lucide-react";

export const SignUpForm = () => {
  const { t ,error, form, onSubmit, isError, isPending } = useSignUp();

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title={t("pages.signUp.title")}>
        {`${t("pages.signUp.hasAccount")} `}
        <a className="font-semibold" href={ROUTES.auth.signIn}>
          {t("pages.signUp.signInLink")}
        </a>
        {isError && (
          <div className="text-red-600 mt-4 flex items-center justify-center gap-2">
            <CircleX className="size-4 text-red-600" />
            <p>
              <b>
                {error?.message 
                  ? t(
                      `messages.errors.api.${error.message}.short`
                    )
                  : t("messages.errors.fallback")}
              </b>
              .
            </p>
          </div>
        )}
      </AuthCardHeader>

      <AuthCardContent
        {...{
          onSubmit,
          form,
          labelButton: t("pages.signUp.form.submit"),
          isLoading: isPending,
        }}
      >
        <AuthSocialMedia />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            {t("pages.signUp.socialDivider")}
          </span>
        </div>
        <div className="grid gap-6">
          {/** EMAIL  */}
          <AuthField
            label={t("pages.signUp.form.email")}
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            {...{ form }}
          />

          {/** PASSWORD  */}
          <AuthField
            label={t("pages.signUp.form.password")}
            name="password"
            type="password"
            placeholder="••••••••••••"
            required
            {...{ form }}
          />

          {/** CONFIRM PASSWORD  */}
          <AuthField
            label={t("pages.signUp.form.confirmPassword")}
            name="confirmPassword"
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
