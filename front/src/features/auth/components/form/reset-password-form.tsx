import { Card } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";
import { AuthCardContent } from "../auth-card-content";
import { AuthField } from "../auth-field";
import { CheckCircleIcon } from "lucide-react";
import { useResetPassword } from "../hooks/use-reset-password";

export interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({
  token,
}: ResetPasswordFormProps) => {
  const { form, onSubmit, isError, isPending } =
    useResetPassword(token);

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
      </AuthCardHeader>
      <AuthCardContent
        {...{ onSubmit, form, labelButton: "Envoyer", isLoading: isPending }}
      >
        <div className="grid gap-6">
          {/** PASSWORD  */}
          <AuthField
            label="Mot de passe"
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
