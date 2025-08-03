import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { UserTokenModule } from './user-token/user-token.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtConfigModule } from './jwt-config/jwt-config.module';
import { JwtManagerModule } from './jwt-manager/jwt-manager.module';
import { TOKEN_TYPE } from './decorators/token-type.decorator';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ThrottlerModule.forRoot(),
    UserModule,
    PrismaModule,
    AuthModule,
    EmailModule,
    UserTokenModule,
    JwtConfigModule,
    JwtManagerModule,

  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    {
      provide: TOKEN_TYPE,
      useValue: 'ACCESS',
    },
  ],
})
export class AppModule {}
