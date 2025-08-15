import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";
import { AuthCardContent } from "../auth-card-content";
import { AuthSocialMedia } from "../auth-social-media";
import { AuthField } from "../auth-field";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type z from "zod";
import { createSignUpSchema } from "../../schema/sign-up-schema";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";
import type { ApiErrorsInterface } from "@/shared/interfaces/api-errors.interface";



export const SignInForm = () => {

  const { t } = useTranslation('auth/errors');

  const signUpSchema = createSignUpSchema(t);
  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: AuthService.signUp,
    onError: (error: ApiErrorsInterface)=> {
      toast.error(t(`api_response.${error.message.toLowerCase()}`,'Une erreur inattendue s\'est produite'))
    }
  } 
)

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    mutation.mutate(values)
  };

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title="Créer un compte">
        Vous avez déjà un compte ?{" "}
        <a className="font-semibold" href="">
          Connectez-vous
        </a>
      </AuthCardHeader>
      <AuthCardContent {...{ onSubmit, form }}>
        <AuthSocialMedia />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Ou
          </span>
        </div>
        <div className="grid gap-6">
          {/** EMAIL  */}
          <AuthField
            label="Email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            {...{ form }}
          />

          {/** PASSWORD  */}
          <AuthField
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="••••••••••••"
            required
            {...{ form }}
          />

          {/** CONFIRM PASSWORD  */}
          <AuthField
            label="Confirmer le mot de passe"
            name="confirmPassword"
            type="password"
            placeholder="••••••••••••"
            required
            {...{ form }}
          />
          <Button
            type="submit"
            className="w-full  text-white"
            size="form"
            variant="blue"
          >
            Créer un compte
          </Button>
        </div>
      </AuthCardContent>
    </Card>
  );
};
