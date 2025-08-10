import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";


interface AuthFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required : boolean;
  form: any;
}

export const AuthField = ({
  form,
  label,
  name,
  type,
  required,
  placeholder,
}: AuthFieldProps) => {
  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...{placeholder,type,required,...field}}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
