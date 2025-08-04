import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { TokenType } from 'src/user-token/enum/token-type.enum';
import { GenerateJwtOutputInterface } from './interface/generate-jwt-output.interface';
import { PayloadJwtInterface } from './interface/payload-jwt.interface';

@Injectable()
export class JwtManagerService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  //TODO: renvoyer une erreur lors du démarrage du serveur si les secret et expiration pas définis
  //TODO: Gérer les typages d'interfaces et de retour 
  async generate(
    userId: number,
    email: string,
    type: TokenType,
    uuid?: string
  ): Promise<GenerateJwtOutputInterface> {
    const expiresIn = this.__getExpiration(type);
    const token = await this.jwtService.signAsync({
      sub: userId,
      email,
      ...(uuid ? { uuid } : {}),

    }, {
      secret: this.__getSecret(type),
      expiresIn,
    });
    return { token, expiresIn };
  }

  async verify(
    token: string,
    type: TokenType,
  ): Promise<PayloadJwtInterface> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.__getSecret(type),
    });
  }


  /********************************************* PRIVATE METHOD *********************************************************************************************** */

  

  private __getSecret(type: TokenType): string {
    switch (type) {
      case TokenType.FORGOT_PASSWORD:
        return this.configService.get('JWT_FORGOT_PASSWORD_SECRET') as string ;
      case TokenType.REFRESH:
        return this.configService.get('JWT_REFRESH_SECRET') as string ;
      case TokenType.CONFIRM_ACCOUNT:
      default:
        return this.configService.get('JWT_DEFAULT_SECRET') as string;
    }

  }


  private __getExpiration(type: TokenType): number {
    switch (type) {
      case TokenType.CONFIRM_ACCOUNT:
        return this.configService.get('JWT_CONFIRMATION_ACCOUNT_EXPIRATION') as number ;
      case TokenType.FORGOT_PASSWORD:
        return this.configService.get('JWT_FORGOT_PASSWORD_EXPIRATION') as number ;
      case TokenType.REFRESH:
        return this.configService.get('JWT_REFRESH_EXPIRATION') as number ;
      default:
        return this.configService.get('JWT_ACCESS_EXPIRATION') as number ;
    }

  }

}
