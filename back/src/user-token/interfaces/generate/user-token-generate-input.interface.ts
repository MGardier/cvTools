import { TokenType } from '@prisma/client';
import { JwtSecretInterface } from '../../../jwt-manager/interface/jwt-secret.interface';
import { JwtExpirationInterface } from '../../../jwt-manager/interface/jwt-expiration.interface';
import { JwtPayloadInterface } from '../../../jwt-config/interfaces/jwt-payload.interface';

export interface UserTokenGenerateInputInterface {
  payload: JwtPayloadInterface;
  expiresKey: keyof JwtExpirationInterface;
  secretKey: keyof JwtSecretInterface;
  type?: TokenType;
}
