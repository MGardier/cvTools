import { SetMetadata } from '@nestjs/common';
import { JwtSecretInterface } from 'src/jwt-config/interfaces/jwt-secret.interface';

export const TOKEN_TYPE = 'tokenType';
export const TokenType = (type: keyof JwtSecretInterface) =>
  SetMetadata('tokenType', type);
