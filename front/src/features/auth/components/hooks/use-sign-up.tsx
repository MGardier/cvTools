import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../auth.service";
import { toast } from "react-toastify";

import { createSignUpSchema } from "../../schema/auth-schema";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";
import type { ApiErrors, SignUpResponse } from "../../types/api";
import type { UseSignUpReturn } from "../../types/hook";





export const useSignUp = (): UseSignUpReturn => {

  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const schema = createSignUpSchema(t);
  const defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation = useMutation<SignUpResponse, ApiErrors, z.infer<typeof schema>>({
    mutationFn: authService.signUp,
    onSuccess :(response)=> {
      toast.success(t("messages.success.signUp.short"))
      navigate(`/${ROUTES.auth.confirmAccount}?email=${response.data.email}`)
      
    },
    onError: (error)=> {
      toast.error(t(`messages.errors.api.${error.message}.short`,t('messages.errors.fallback')))
    }
  } 
)

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutation.mutate(values)
  };

  return {t, error: mutation.error ,form, onSubmit, isError : mutation.isError, isPending : mutation.isPending}
}