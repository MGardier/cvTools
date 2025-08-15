
import { apiClient } from '@/api/axios';
import type { SignUpInterface } from '../interfaces/sign-up.interface';



const ENDPOINT = '/auth';

export abstract class AuthApi  {


  static async signUp(params: SignUpInterface) {
    return await apiClient.post(`${ENDPOINT}/signUp`, params);
  }

}




