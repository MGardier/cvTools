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
import { useState } from "react";






export const useSendConfirmAccount = (defaultEmail: string | null): UseSendConfirmReturn => {

  const [email,setEmail] = useState(defaultEmail);
  const { t } = useTranslation('auth');


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
      toast.success(t("messages.success.sendConfirmAccount.short"))
      setEmail(response.data.email)
      
    } ,
    onError: ()=> {
      toast.error(t(`messages.errors.fallback`))
      setEmail(null)
    }
  } 
)

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutation.mutate(values)
  };

  return {t,form, email, onSubmit, isSuccess: mutation.isSuccess, isPending : mutation.isPending, isError: mutation.isError}
}