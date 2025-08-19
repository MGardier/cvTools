

import { authApi } from "./auth.api";

import type { ConfirmAccountResponse, ResetPasswordParams, ResetPasswordResponse, SendConfirmAccountResponse, SendForgotPasswordResponse, SignUpResponse } from "./types/api";
import type { ConfirmAccountData, SendConfirmAccountData, SendForgotPasswordData, SignUpData } from "./types/form";


export const authService = {

  /**************** SIGNUP ************************************************************/

  async signUp(data: SignUpData): Promise<SignUpResponse> {
    const params = { email: data.email, password: data.password };
    return await authApi.signUp(params);
  },

  /****************  CONFIRM ACCOUNT ************************************************************/

  async sendConfirmAccount(data: SendConfirmAccountData): Promise<SendConfirmAccountResponse> {
    const params = { email: data.email };
    return await authApi.sendConfirmAccount(params);
  },

  async confirmAccount(data: ConfirmAccountData): Promise<ConfirmAccountResponse> {
    const params = { token: data.token };
    return await authApi.confirmAccount(params);
  },


  /**************** SIGNIN ************************************************************/


  /****************  RESET PASSWORD ************************************************************/

  async sendForgotPassword(data: SendForgotPasswordData): Promise<SendForgotPasswordResponse> {
    return await authApi.sendForgotPassword(data);
  },

  async resetPassword(data: ResetPasswordParams): Promise<ResetPasswordResponse> {
    return await authApi.resetPassword(data);
  },

}