import { SetMetadata } from '@nestjs/common';
import { JwtSecretInterface } from 'src/jwt-manager/interface/jwt-secret.interface';

//TODO: refacto ici pour le refresh et le access

export const TOKEN_TYPE = 'tokenType';
export const TokenType = (type: keyof JwtSecretInterface) =>
  SetMetadata('tokenType', type);
