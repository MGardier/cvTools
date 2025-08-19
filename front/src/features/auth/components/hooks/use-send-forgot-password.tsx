import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createSendForgotPasswordSchema } from "../../schema/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type z from "zod";
import { authService } from "../../auth.service";
import type { ApiErrors, SendForgotPasswordResponse } from "../../types/api";
import { ROUTES } from "@/data/routes";

export const useSendForgotPassword =  (defaultEmail: string | null)=> {

  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const schema = createSendForgotPasswordSchema(t);
  const defaultValues = {
    email: defaultEmail || "",
  };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation= useMutation<SendForgotPasswordResponse,ApiErrors,z.infer<typeof schema>>({
    mutationFn: authService.sendForgotPassword,
    onSuccess: (response)=>{
      toast.success(t("api.success.resetPassword.sendEmail"))
      navigate(`/${ROUTES.auth.resetPassword}?email=${response.data.email}`)
      
    } ,
    onError: (error)=> {
      toast.error(t(`apiResponse.${error.message?.toLowerCase()}`,'Une erreur inattendue s\'est produite'))
    }
  } 
)

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutation.mutate(values)
  };

  return {form, onSubmit, isSuccess: mutation.isSuccess, isPending : mutation.isPending, isError: mutation.isError}
}