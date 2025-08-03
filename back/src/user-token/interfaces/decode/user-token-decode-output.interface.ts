import { TokenType, UserToken } from '@prisma/client';
import { JwtPayloadInterface } from '../../../jwt-config/interfaces/jwt-payload.interface';

export interface UserTokenDecodeOutputInterface {
  userToken?: UserToken;
  payload: JwtPayloadInterface;
}
