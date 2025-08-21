

/**************** SIGNUP *********************************************/

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}



/**************** SIGN IN *********************************************/

export interface SignInData extends Omit<SignUpData,"confirmPassword">{

}



/**************** CONFIRM  ACCOUNT *********************************************/

export interface SendConfirmAccountData extends Pick<SignUpData,"email"> {
 
}

export interface ConfirmAccountData {
  token: string;
}



/**************** RESET  PASSWORD *********************************************/

export interface SendForgotPasswordData extends Pick<SignUpData,"email"> {
  
}


export interface ResetPasswordData extends Pick<SignUpData,"password">{


}


