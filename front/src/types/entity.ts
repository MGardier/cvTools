

export type UserStatus  = 
 "ALLOWED"
 | "PENDING"
 | "BANNED"


export interface User {
  id: string;
  email: string;
  status: UserStatus
  
}