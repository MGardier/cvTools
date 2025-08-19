import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignUpForm } from "@/features/auth/components/form/sign-up-form";


export function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
