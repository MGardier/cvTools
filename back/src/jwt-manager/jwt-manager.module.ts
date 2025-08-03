import { Module } from '@nestjs/common';
import { JwtManagerService } from './jwt-manager.service';
import { JwtConfigModule } from '../jwt-config/jwt-config.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtConfigModule, JwtModule],
  providers: [JwtManagerService],
  exports: [JwtManagerService],
})
export class JwtManagerModule {}
