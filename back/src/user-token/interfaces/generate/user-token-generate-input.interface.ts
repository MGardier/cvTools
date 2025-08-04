
import { JwtSecretInterface } from '../../../jwt-manager/interface/jwt-secret.interface';
import { JwtExpirationInterface } from '../../../jwt-manager/interface/jwt-expiration.interface';
import { TokenType } from 'src/user-token/enum/token-type.enum';
import { PayloadJwtInterface } from 'src/jwt-manager/interface/payload-jwt.interface';

export interface UserTokenGenerateInputInterface {
  payload: PayloadJwtInterface;
  expiresKey: keyof JwtExpirationInterface;
  secretKey: keyof JwtSecretInterface;
  type?: TokenType;
}
