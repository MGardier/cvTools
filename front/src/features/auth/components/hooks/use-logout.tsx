import { useTranslation } from "react-i18next";

import { useMutation } from "@tanstack/react-query";
import { authService } from "../../auth.service";

import { toast } from "react-toastify";

import type { UseLogoutReturn } from "../../types/hook";
import type { ApiErrors, LogoutResponse } from "../../types/api";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";
import { useAuthStore } from "../../auth.store";

export const useLogout = (): UseLogoutReturn => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const mutation = useMutation<LogoutResponse, ApiErrors>({
    mutationFn: authService.logout,
    onSuccess: () => {
      authStore.resetAuth();
      toast.success(t("api.success.logout.short"));
      navigate(`/${ROUTES.auth.signIn}`);
    },
    onError: () => {
      toast.error(t("messages.errors.fallback"));
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return { t, isPending: mutation.isPending, isError: mutation.isError };
};
