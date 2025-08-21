import { Card, CardContent } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";

import { useConfirmAccount } from "../hooks/use-confirm-account";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/data/routes";

export interface ReSendConfirmAccountFormProps {
  token: string;
}

export const ConfirmAccountForm = ({
  token,
}: ReSendConfirmAccountFormProps) => {
  const { t, isSuccess, isError, isPending } = useConfirmAccount(token);

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title="Renvoyer un email de confirmation">
        {isSuccess && (
          <p className="text-green-600 mt-4">
            <b>{t("pages.confirmAccount.success.confirmAccount")}</b>
          </p>
        )}
        {isError && (
          <p className="text-red-700 mt-4">
            <b>{t("pages.confirmAccount.errors.tokenInvalid")}</b>
          </p>
        )}
        {isPending && (
          <p className=" mt-4">
            <b>{t("pages.confirmAccount.pending.confirmAccount")}</b>
          </p>
        )}
      </AuthCardHeader>
      <CardContent>
        {isError && ( <Button
              className="w-full flex gap-2  text-white"
              size="form"
              variant="blue"
            >
             <a href={ROUTES.auth.confirmAccount}> {t("pages.confirmAccount.form.button")}</a>
            </Button>)}
      </CardContent>
    </Card>
  );
};
