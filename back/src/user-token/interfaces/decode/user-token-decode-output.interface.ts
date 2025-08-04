import {  UserToken } from '@prisma/client';
import { PayloadJwtInterface } from 'src/jwt-manager/interface/payload-jwt.interface';

export interface UserTokenDecodeOutputInterface {
  userToken?: UserToken;
  payload: PayloadJwtInterface;
}
