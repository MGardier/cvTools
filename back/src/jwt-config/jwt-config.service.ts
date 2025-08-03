import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtSecretInterface } from '../jwt-manager/interface/jwt-secret.interface';
import { JwtExpirationInterface } from '../jwt-manager/interface/jwt-expiration.interface';
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


  private __getEnvVariableOrFail(key: string): string {
    const envVariable = this.config.get(key);
    if (!envVariable)
      throw new InternalServerErrorException(
        `Missing env variable ${key} and must be defined`,
      );
    return envVariable;
  }
}
