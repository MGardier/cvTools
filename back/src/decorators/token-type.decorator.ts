import { SetMetadata } from '@nestjs/common';
import { TokenType } from 'src/user-token/enum/token-type.enum';


//TODO: refacto ici pour le refresh et le access

export const TOKEN_TYPE = 'tokenType';
export const Token_Type = (type: TokenType.ACCESS | TokenType.REFRESH) =>
  SetMetadata('tokenType', type);
