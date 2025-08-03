import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtSecretInterface } from './interfaces/jwt-secret.interface';
import { JwtExpirationInterface } from './interfaces/jwt-expiration.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  private secrets: JwtSecretInterface;
  private expirations: JwtExpirationInterface;

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    this.secrets = {
      DEFAULT: this.__getEnvVariableOrFail('JWT_DEFAULT_SECRET'),
      FORGOT_PASSWORD: this.__getEnvVariableOrFail(
        'JWT_FORGOT_PASSWORD_SECRET',
      ),
      REFRESH: this.__getEnvVariableOrFail('JWT_REFRESH_SECRET'),
      ACCESS: this.__getEnvVariableOrFail('JWT_ACCESS_SECRET'),
    };

    this.expirations = {
      CONFIRMATION_ACCOUNT: +this.__getEnvVariableOrFail(
        'JWT_CONFIRMATION_ACCOUNT_EXPIRATION',
      ),
      FORGOT_PASSWORD: +this.__getEnvVariableOrFail(
        'JWT_FORGOT_PASSWORD_EXPIRATION',
      ),
      REFRESH: +this.__getEnvVariableOrFail('JWT_REFRESH_EXPIRATION'),
      ACCESS: +this.__getEnvVariableOrFail('JWT_ACCESS_EXPIRATION'),
    };
  }

  getSecret(type: keyof JwtSecretInterface) {
    const value = this.secrets[type];
    if (!value)
      throw new InternalServerErrorException(
        `Wrong value for secret key for ${type} doesn't exist`,
      );
    return value;
  }

  getExpiration(type: keyof JwtExpirationInterface) {
    const value = this.expirations[type];
    if (!value)
      throw new InternalServerErrorException(
        `Key  ${type} doesn't exist in expiration`,
      );
    return value;
  }

  private __getEnvVariableOrFail(key: string): string {
    const envVariable = this.config.get(key);
    if (!envVariable)
      throw new InternalServerErrorException(
        `Missing env variable ${key} and must be defined`,
      );
    return envVariable;
  }
}
