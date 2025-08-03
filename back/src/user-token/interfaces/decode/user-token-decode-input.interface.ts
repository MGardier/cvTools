import { TokenType } from '@prisma/client';
import { JwtSecretInterface } from '../../../jwt-manager/interface/jwt-secret.interface';

export interface UserTokenDecodeInputInterface {
  token: string;
  secretKey: keyof JwtSecretInterface;
  type?: TokenType;
}
