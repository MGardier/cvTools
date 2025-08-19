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
  const { form, onSubmit, isError, isPending } =
    useSendConfirmAccount(defaultEmail);

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title="Renvoyer un email de confirmation">
        {isError && (
          <div className="text-red-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-4 text-red-600" />
            <p>
              <b>Le lien de confirmation n'est pas valide ou a expiré.</b>.
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
        {...{ onSubmit, form, labelButton: "Renvoyer", isLoading: isPending }}
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
