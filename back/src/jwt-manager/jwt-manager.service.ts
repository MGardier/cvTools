import { Inject, Injectable } from '@nestjs/common';
import { JwtConfigService } from '../jwt-config/jwt-config.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from '../jwt-config/interfaces/jwt-payload.interface';
import { JwtExpirationInterface } from './interface/jwt-expiration.interface';
import { JwtSecretInterface } from './interface/jwt-secret.interface';
import { JwtManagerGenerateOutputInterface } from './interface/jwt-manager-generate-output.interface';
import { TokenType } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtManagerService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  //TODO: renvoyer une erreur lors du démarrage du serveur si les secret et expiration pas définis
  async generate(
    userId : number, 
    email:string,
    type: TokenType
    ,uuid ?: string
  ): Promise<JwtManagerGenerateOutputInterface> {
    const expiresIn = this.__getExpiration(type);
    const token = await this.jwtService.signAsync({
      sub: userId,
      email,
      
    }, {
      secret: this.__getSecret(type),
      expiresIn,
    });
    return { token, expiresIn };
  }

  async verify(
    token: string,
    type: TokenType,
  ): Promise<JwtPayloadInterface> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.__getSecret(type),
    });
  }


 
    private __getSecret(type: TokenType) {

    switch (type) {
      case TokenType.FORGOT_PASSWORD:
        return this.configService.get('JWT_FORGOT_PASSWORD_SECRET'); 
      case TokenType.REFRESH:
        return this.configService.get('JWT_REFRESH_SECRET');
      case TokenType.CONFIRM_ACCOUNT:
      default:
        return this.configService.get('JWT_DEFAULT_SECRET');
    }

  }

  


  private __getExpiration(type: TokenType) {

    switch (type) {
      case TokenType.CONFIRM_ACCOUNT:
        return this.configService.get('JWT_CONFIRMATION_ACCOUNT_EXPIRATION');
      case TokenType.FORGOT_PASSWORD:
        return this.configService.get('JWT_FORGOT_PASSWORD_EXPIRATION'); 
      case TokenType.REFRESH:
        return this.configService.get('JWT_REFRESH_EXPIRATION');
      default:
        return this.configService.get('JWT_ACCESS_EXPIRATION');
    }

  }

}
