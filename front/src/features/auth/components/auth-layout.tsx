
interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout =({children} : AuthLayoutProps)=> {
   return (<div className="container mx-auto py-10 flex flex-col justify-center items-center">
     {children}
    </div>)
}