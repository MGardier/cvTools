import { Card } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";
import { AuthCardContent } from "../auth-card-content";
import { AuthField } from "../auth-field";
import { CheckCircleIcon } from "lucide-react";
import { useSendForgotPassword } from "../hooks/use-send-forgot-password";

export interface SendResetPasswordFormProps {
  defaultEmail: string | null;
}

export const SendForgotPasswordForm = ({
  defaultEmail,
}: SendResetPasswordFormProps) => {
  const { t,form, onSubmit, isError, isPending } =
    useSendForgotPassword(defaultEmail);

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title={t("pages.sendForgotPassword.title")}>
        {isError && (
          <div className="text-red-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-4 text-red-600" />
            <p>
              <b>{t("pages.sendForgotPassword.errors.sendingEmailFailed")}</b>.
            </p>
          </div>
        )}
        {Boolean(defaultEmail) && (
          <div className="text-green-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-4 text-green-600" />
            <p>
              {t("pages.sendForgotPassword.success.emailSendAt")} <b>{defaultEmail}</b>.
            </p>
          </div>
        )}
      </AuthCardHeader>
      <AuthCardContent
        {...{ onSubmit, form, labelButton:   t("pages.sendForgotPassword.form.button"), isLoading: isPending }}
      >
        <div className="grid gap-6">
          {/** EMAIL  */}
          <AuthField
            label= {t("pages.sendForgotPassword.form.email")} 
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            {...{ form }}
          />
        </div>
      </AuthCardContent>
    </Card>
  );
};
