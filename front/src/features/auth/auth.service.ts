

import { authApi } from "./auth.api";

import type { ConfirmAccountResponse, LogoutResponse, ResetPasswordParams, ResetPasswordResponse, SendConfirmAccountResponse, SendForgotPasswordResponse, SignInResponse, SignUpResponse } from "./types/api";
import type { ConfirmAccountData, SendConfirmAccountData, SendForgotPasswordData, SignInData, SignUpData } from "./types/form";


export const authService = {

  /**************** SIGNUP ************************************************************/

  async signUp(data: SignUpData): Promise<SignUpResponse> {
    const params = { email: data.email, password: data.password };
    return await authApi.signUp(params);
  },


  /**************** SIGNIN ************************************************************/

  async signIn(data: SignInData): Promise<SignInResponse> {
    const params = { email: data.email, password: data.password };
    return await authApi.signIn(params);
  },

  /**************** LOGOUT ************************************************************/

  async logout(): Promise<LogoutResponse> {
    return await authApi.logout();
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


  /****************  RESET PASSWORD ************************************************************/

  async sendForgotPassword(data: SendForgotPasswordData): Promise<SendForgotPasswordResponse> {
    return await authApi.sendForgotPassword(data);
  },

  async resetPassword(data: ResetPasswordParams): Promise<ResetPasswordResponse> {
    return await authApi.resetPassword(data);
  },

}