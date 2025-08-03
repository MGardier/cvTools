import { TokenType } from '@prisma/client';
import { JwtSecretInterface } from '../../../jwt-config/interfaces/jwt-secret.interface';

export interface UserTokenDecodeInputInterface {
  token: string;
  secretKey: keyof JwtSecretInterface;
  type?: TokenType;
}
