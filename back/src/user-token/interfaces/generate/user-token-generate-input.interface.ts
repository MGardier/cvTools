import { TokenType } from '@prisma/client';
import { JwtSecretInterface } from '../../../jwt-config/interfaces/jwt-secret.interface';
import { JwtExpirationInterface } from '../../../jwt-config/interfaces/jwt-expiration.interface';
import { JwtPayloadInterface } from '../../../jwt-config/interfaces/jwt-payload.interface';

export interface UserTokenGenerateInputInterface {
  payload: JwtPayloadInterface;
  expiresKey: keyof JwtExpirationInterface;
  secretKey: keyof JwtSecretInterface;
  type?: TokenType;
}
