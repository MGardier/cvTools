import { Card } from "@/components/ui/card";
import { AuthCardHeader } from "../auth-card-header";
import { AuthCardContent } from "../auth-card-content";
import { AuthSocialMedia } from "../auth-social-media";
import { AuthField } from "../auth-field";
import { useSignUp } from "../hooks/use-sign-up";



export const SignUpForm = () => { 

  const {form,onSubmit, isPending} = useSignUp();

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title="Créer un compte">
        Vous avez déjà un compte ?{" "}
        <a className="font-semibold" href="">
          Connectez-vous
        </a>
      </AuthCardHeader>


      <AuthCardContent {...{ onSubmit, form , labelButton: "Créer un compte", isLoading : isPending }}>
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
        
        </div>
      </AuthCardContent>
    </Card>
  );
};
