import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface AuthFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
}

export const AuthField = ({label, id, type, placeholder} : AuthFieldProps) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor="email">{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required
      />
    </div>
  );
};
