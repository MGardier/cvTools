

export type UserStatus  = 
 "ALLOWED"
 | "PENDING"
 | "BANNED"


 export type UserRoles  = 
 "ADMIN"
 | "USER"




export interface User {
  id: string;
  email: string;
  status: UserStatus
  roles : UserRoles;
  createdAt ?: Date;
  updatedAt ?: Date;
  
}