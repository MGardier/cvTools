import { useTranslation } from "react-i18next";

import { useMutation } from "@tanstack/react-query";
import { authService } from "../../auth.service";

import { toast } from "react-toastify";

import type { UseConfirmReturn } from "../../types/hook";
import type { ApiErrors, ConfirmAccountResponse } from "../../types/api";
import type { ConfirmAccountData } from "../../types/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";

export const useConfirmAccount = (token: string): UseConfirmReturn => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const mutation = useMutation<
    ConfirmAccountResponse,
    ApiErrors,
    ConfirmAccountData
  >({
    mutationFn: authService.confirmAccount,
    onSuccess: () => {
      toast.success(t("api.success.confirmAccount.short"));
      navigate(`/${ROUTES.auth.signIn}`);
    },
    onError: () => toast.error(t(`messages.errors.confirmAccount`)),
  });

  useEffect(() => {
    mutation.mutate({ token });
  }, []);

  return {
    t,
    isSuccess: mutation.isSuccess,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
};
