

/**************** SIGNUP *********************************************/

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}



/**************** CONFIRM  ACCOUNT *********************************************/

export interface SendConfirmAccountData {
  email: string;
}

export interface ConfirmAccountData {
  token: string;
}



/**************** RESET  PASSWORD *********************************************/

export interface SendForgotPasswordData {
  email: string;
}


export interface ResetPasswordData {
  password: string;
  token:string;
}


