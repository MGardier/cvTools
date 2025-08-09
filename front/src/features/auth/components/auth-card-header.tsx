import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface AuthCardHeaderProps {
  title: string;
  children: React.ReactNode;
}

export const AuthCardHeader = ({ title, children }: AuthCardHeaderProps) => {
  return (
    <CardHeader className="text-center">
      <CardTitle className="text-xl py-2 ">
        <h1 className="text-2xl font-display font-semibold effect-font-styling text-[28px] leading-[34px] tracking-[-0.045rem]">
          {title}
        </h1>
      </CardTitle>
      <CardDescription className="font-normal  font-sans text-sm ">
        {children}
      </CardDescription>
    </CardHeader>
  );
};
