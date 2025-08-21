import { Card } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";
import { AuthCardContent } from "../auth-card-content";
import { AuthField } from "../auth-field";
import { useSendConfirmAccount } from "../hooks/use-resend-confirm-account";
import { CheckCircleIcon } from "lucide-react";

export interface ReSendConfirmAccountFormProps {
  defaultEmail: string | null;
}

export const ReSendConfirmAccountForm = ({
  defaultEmail,
}: ReSendConfirmAccountFormProps) => {


  const { t, email, form, onSubmit, isSuccess, isError, isPending } =
    useSendConfirmAccount(defaultEmail);
  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title={t("pages.confirmAccount.title")}>

        {/** For user who come from signUp and successfully create her account */}
        {defaultEmail && !isSuccess && !isError && (
          <div className="text-green-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-4 text-green-600" />
            <p>
                {`${t("pages.confirmAccount.success.emailSendAt")} `}<b>{email}</b>.
            </p>
          </div>
        )}

        {isError && (
          <div className="text-red-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-4 text-red-600" />
            <p>
              <b>{t("pages.confirmAccount.errors.sendingEmailFailed")}</b>.
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="text-green-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-4 text-green-600" />
            <p>
              {`${t("pages.confirmAccount.success.emailResendAt")} `}<b>{email}</b>.
            </p>
          </div>
        )}
      </AuthCardHeader>
      <AuthCardContent
        {...{ onSubmit, form, labelButton: t("pages.confirmAccount.form.button"), isLoading: isPending }}
      >
        <div className="grid gap-6">
          {/** EMAIL  */}
          <AuthField
            label={t("pages.confirmAccount.form.email")}
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
