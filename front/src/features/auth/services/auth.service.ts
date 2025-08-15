
import { AuthApi } from "../api/auth.api";
import type { SignUpInterface } from "../interfaces/sign-up.interface";


export abstract class AuthService {


 static  async signUp(data : SignUpInterface){ 
    
    const params  = {email: data.email, password: data.password};
    return await AuthApi.signUp(params);
    
  }
  
}