import {  CardContent} from "@/shared/components/ui/card";


interface AuthCardContentProps {

  children: React.ReactNode;
}


export const AuthCardContent = ({children} : AuthCardContentProps )=>  {
  return (  
      <CardContent>
        <form>
          <div className="grid gap-6">
          {children}
          </div>
        </form>
      </CardContent>
  );
}