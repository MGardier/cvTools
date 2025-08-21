import { Card, CardContent } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";

import { useLogout } from "../hooks/use-logout";


export const LogoutForm = () => {
  const {t,  isError, isPending } = useLogout();

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title={t("pages.logout.title")}>
       
        {isError && (
          <p className="text-red-700 mt-4">
            <b>
             {t("pages.logout.title")}
            </b>
          </p>
        )}
        {isPending && (
          <p className=" mt-4">
            <b>
              {t("pages.logout.pending.waitingLogout")}

            </b>
          </p>
        )}
      </AuthCardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
