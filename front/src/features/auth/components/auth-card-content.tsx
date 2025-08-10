import {  CardContent} from "@/shared/components/ui/card";
import { Form } from "@/shared/components/ui/form";


interface AuthCardContentProps {
  children: React.ReactNode;
  onSubmit : any,
  form: any,
 
}


export const AuthCardContent = ({children,form, onSubmit} : AuthCardContentProps )=>  {


  return (  
      <CardContent>
        <Form {...form}>  
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
          {children}
          </div>
        </form>
        </Form>
      </CardContent>
  );
}