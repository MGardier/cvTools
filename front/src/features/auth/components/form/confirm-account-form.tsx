import { Card, CardContent } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";

import { useConfirmAccount } from "../hooks/use-confirm-account";

export interface ReSendConfirmAccountFormProps {
  token: string;
}

export const ConfirmAccountForm = ({
  token,
}: ReSendConfirmAccountFormProps) => {
  const { isSuccess, isError, isPending } = useConfirmAccount(token);

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title="Renvoyer un email de confirmation">
        {isSuccess && (
          <p className="text-green-600 mt-4">
            <b>
              Compte validé
            </b>
          </p>
        )}
        {isError && (
          <p className="text-red-700 mt-4">
            <b>
              Une erreur est survenue et le lien de confirmation n'a pas été
              envoyé. Veuillez réessayer ultériement.
            </b>
          </p>
        )}
        {isPending && (
          <p className=" mt-4">
            <b>
              Confirmation de votre compte en cours ...

            </b>
          </p>
        )}
      </AuthCardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
