import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../auth.service";
import { toast } from "react-toastify";

import { createSignInSchema } from "../../schema/auth-schema";
import { useNavigate } from "react-router-dom";
import type { ApiErrors, SignInResponse } from "../../types/api";
import type { UseSignInReturn } from "../../types/hook";
import { useAuthStore } from "../../auth.store";
import { ROUTES } from "@/data/routes";

export const useSignIn = (): UseSignInReturn => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const schema = createSignInSchema(t);
  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation = useMutation<
    SignInResponse,
    ApiErrors,
    z.infer<typeof schema>
  >({
    mutationFn: authService.signIn,
    onSuccess: (response) => {
      toast.success(t("messages.success.signIn"));
      authStore.setAuth({ ...response.data.tokens, user: response.data.user });
      navigate(`${ROUTES.home}`);
    },
    onError: () => toast.error(t("messages.errors.fallback")),
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutation.mutate(values);
  };

  return { t, form, onSubmit, isPending: mutation.isPending };
};
