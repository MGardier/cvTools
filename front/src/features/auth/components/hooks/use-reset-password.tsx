import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createResetPasswordSchema } from "../../schema/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type z from "zod";
import { authService } from "../../auth.service";
import type { ApiErrors, ResetPasswordResponse } from "../../types/api";
import { ROUTES } from "@/data/routes";

export const useResetPassword = (token: string) => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const schema = createResetPasswordSchema(t);
  const defaultValues = {
    password: "",
  };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation = useMutation<
    ResetPasswordResponse,
    ApiErrors,
    z.infer<typeof schema>
  >({
    mutationFn: (formData: z.infer<typeof schema>) =>
      authService.resetPassword({ ...formData, token }),
    onSuccess: () => {
      toast.success(t("api.success.resetPassword.reset"));
      navigate(`/${ROUTES.auth.signIn}`);
    },
    onError: (error) => {
      toast.error(
        t(
          `apiResponse.${error.message?.toLowerCase()}`,
          "Une erreur inattendue s'est produite"
        )
      );
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutation.mutate(values);
  };

  return {
    form,
    onSubmit,
    isSuccess: mutation.isSuccess,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
};
