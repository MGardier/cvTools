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
  const { form, onSubmit, isError, isPending } =
    useSendForgotPassword(defaultEmail);

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title="Changer son mot de passe">
        {isError && (
          <div className="text-red-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-4 text-red-600" />
            <p>
              <b>Une erreur est survenue.</b>.
            </p>
          </div>
        )}
        {Boolean(defaultEmail) && (
          <div className="text-green-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-4 text-green-600" />
            <p>
              Un nouvel email été envoyé à l'adresse <b>{defaultEmail}</b>.
            </p>
          </div>
        )}
      </AuthCardHeader>
      <AuthCardContent
        {...{ onSubmit, form, labelButton: "Envoyer", isLoading: isPending }}
      >
        <div className="grid gap-6">
          {/** EMAIL  */}
          <AuthField
            label="Email"
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
