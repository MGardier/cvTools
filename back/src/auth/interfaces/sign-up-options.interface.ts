import { User, UserToken } from "@prisma/client";

export interface SignUpOptionsInterface {

  userSelectedColumn?: (keyof User)[];
  userTokenSelectedColumn?: (keyof UserToken)[];

}