import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";
import { AuthCardContent } from "../auth-card-content";
import { AuthSocialMedia } from "../auth-social-media";
import { AuthField } from "../auth-field";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "./sign-up-schema";
import type z from "zod";

//TODO : surlignage en rouge des champs

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) =>
    console.log(values);

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
