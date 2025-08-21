import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LogoutForm } from "@/features/auth/components/form/logout-form";



export function LogoutPage() {
  return (
    <AuthLayout>
      <LogoutForm />
    </AuthLayout>
  );
}
