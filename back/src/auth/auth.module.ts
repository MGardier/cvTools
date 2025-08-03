import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';
import { UserTokenModule } from '../user-token/user-token.module';
import { ResponseModule } from 'src/response/response.module';

@Module({
  imports: [UserModule, EmailModule, UserTokenModule, ResponseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
