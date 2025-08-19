import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../auth.service";

import { toast } from "react-toastify";

import { createSendConfirmAccountSchema } from "../../schema/auth-schema";


import type { UseSendConfirmReturn } from "../../types/hook";
import type { ApiErrors, SendConfirmAccountResponse } from "../../types/api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";





export const useSendConfirmAccount = (defaultEmail: string | null): UseSendConfirmReturn => {


  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const schema = createSendConfirmAccountSchema(t);
  const defaultValues = {
    email: defaultEmail || "",
  };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation= useMutation<SendConfirmAccountResponse,ApiErrors,z.infer<typeof schema>>({
    mutationFn: authService.sendConfirmAccount,
    onSuccess: (response)=>{
      toast.success(t("api.success.confirmAccount.sendEmail"))
      navigate(`/${ROUTES.auth.confirmAccount}?email=${response.data.email}`)
      
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