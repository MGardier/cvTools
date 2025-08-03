import { User } from '@prisma/client';

export interface SignUpOutputInterface {
  user: Partial<User>;
  success: boolean;
  errorCode?: string;
}
