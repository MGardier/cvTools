import { Injectable } from '@nestjs/common';
import { JwtConfigService } from '../jwt-config/jwt-config.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from '../jwt-config/interfaces/jwt-payload.interface';
import { JwtExpirationInterface } from '../jwt-config/interfaces/jwt-expiration.interface';
import { JwtSecretInterface } from '../jwt-config/interfaces/jwt-secret.interface';
import { JwtManagerGenerateOutputInterface } from './interface/jwt-manager-generate-output.interface';

@Injectable()
export class JwtManagerService {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generate(
    payload: JwtPayloadInterface,
    secretKey: keyof JwtSecretInterface,
    expiresKey: keyof JwtExpirationInterface,
  ): Promise<JwtManagerGenerateOutputInterface> {
    const expiresIn = this.jwtConfigService.getExpiration(expiresKey);
    const token = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfigService.getSecret(secretKey),
      expiresIn,
    });
    return { token, expiresIn };
  }

  async verify(
    token: string,
    secretKey: keyof JwtSecretInterface,
  ): Promise<JwtPayloadInterface> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.jwtConfigService.getSecret(secretKey),
    });
  }
}
