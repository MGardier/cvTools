import * as React from "react"

import { cn } from "@/shared/utils/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
     className={cn(
        "flex",              
        "h-12",             
        "w-full",            
        "rounded-2xl",       
        "border",            
        "border-input",      
        "bg-transparent",    
        "px-3 py-1",        
        "text-base",         
        "shadow-xs",         
        "outline-none",     
        "transition-[color,box-shadow]", 
        "md:text-sm",        
        
        //File style
        "file:text-foreground",      
        "file:inline-flex",          
        "file:h-7",                  
        "file:border-0",             
        "file:bg-transparent",       
        "file:text-sm",              
        "file:font-medium",          
        
        "placeholder:text-muted-foreground", 
        
        //Selection style
        "selection:bg-blue-900",               
        "selection:text-white",  

        //Focus style
        "focus:ring-2 focus:ring-blue-500 ",
        "focus:text-blue-900 ",
        
        // Disabled style
        "disabled:pointer-events-none", 
        "disabled:cursor-not-allowed",  
        "disabled:opacity-50",          
        
        className 
      )}
      {...props}
    />
  )
}

export { Input }
