import { Injectable } from '@nestjs/common';

import { JwtManagerService } from '../jwt-manager/jwt-manager.service';
import { v4 as uuidv4 } from 'uuid';
import { TokenType } from './enum/token-type.enum';
import { UserTokenRepository } from './user-token.repository';

@Injectable()
export class UserTokenService {
  constructor(
    private readonly jwtManagerService: JwtManagerService,
    private readonly userTokenRepository: UserTokenRepository,
  ) { }


  async generate(userId: number, email: string, type: TokenType): Promise<string> {

    const {token} =  await this.jwtManagerService.generate(userId, email, type);
    return token;

  }


    async generateAndSave(userId: number, email: string, type: TokenType): Promise<string> {
    let uuid: string = this.__createUuid();
    const { token, expiresIn } = await this.jwtManagerService.generate(userId, email, type);

    await this.userTokenRepository.create(
      token,
      type,
      this.__convertExpiresToDate(expiresIn),
      userId,
      uuid,
      ['id']
    );
    
    return token;
  }


  //TODO : comparer le token avec celui en base

  // async decode(
  //   token: string, type: TokenType,
  // ): Promise<UserTokenDecodeOutputInterface> {
  //   let userToken;
  //   const payload = await this.jwtManagerService.verify(
  //     token,
  //     type,
  //   );

  //   if (settings.type && payload.uuid)
  //     userToken = await this.__findByUuid(payload.uuid);

  //   return userToken ? { userToken, payload } : { payload };
  // }

  /********************************************* PRIVATE FUNCTION *********************************************/


  private __createUuid(): string {
    return uuidv4();
  }

  //Déplacer dans utils
  private __convertExpiresToDate(expiresIn: number): Date {
    return new Date(new Date().getTime() + expiresIn * 1000);
  }



  //Refacto du jwtconfig et manager ainsi que pour récuperer les différents expires ou secret + trhow une erreur si pas définis lors du démarrage du serveur.

}



