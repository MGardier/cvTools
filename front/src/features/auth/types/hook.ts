import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { SendConfirmAccountData, SignUpData } from "./form";




/**************** SIGNUP *********************************************/

export interface UseSignUpReturn {
  onSubmit: SubmitHandler<SignUpData>;
  form: UseFormReturn<SignUpData>;
  isPending: boolean;
}


/**************** CONFIRM  ACCOUNT *********************************************/

export interface UseSendConfirmReturn {
  onSubmit: SubmitHandler<SendConfirmAccountData>;
  form: UseFormReturn<SendConfirmAccountData>;
  isPending: boolean;  
  isSuccess: boolean;  
  isError: boolean;  
}

export interface UseConfirmReturn {
  isPending: boolean;  
  isSuccess: boolean;  
  isError: boolean;  
}

