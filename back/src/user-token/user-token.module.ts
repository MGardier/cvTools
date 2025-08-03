import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtManagerModule } from '../jwt-manager/jwt-manager.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    JwtManagerModule,
  ],
  controllers: [],
  providers: [UserTokenService],
  exports: [UserTokenService],
})
export class UserTokenModule {}
