import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const AuthCardHeader = ({ title, children }: AuthCardHeaderProps) => {
  return (
    <CardHeader className="text-center">
      <CardTitle className="text-xl py-2 ">
        <h1 className="text-3xl font-display font-semibold  leading-8 tracking-tighter">
          {title}
        </h1>
      </CardTitle>
      <CardDescription className="font-normal  font-sans text-sm ">
        {children}
      </CardDescription>
    </CardHeader>
  );
};
