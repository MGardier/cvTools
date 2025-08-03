import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../auth/dto/sign-up.dto';

import { Public } from '../decorators/public.decorator';

import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { TokenType } from 'src/decorators/token-type.decorator';
import { ResponseService } from 'src/response/response.service';
import { ResponseInterface } from 'src/response/interface/response.interface';
import { User, UserToken } from '@prisma/client';
import { SignInOutputInterface } from './interfaces/sign-in-output.interface';
import { error } from 'console';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

//revoir les rate limiter sur l'auth et le skip

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  /* ----------  AUTHENTIFICATION ------------------------------------------------------- */

  //@Throttle({ critical: {} })

  @Public()
  @SkipThrottle()
  @Post('signUp')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<ResponseInterface<Partial<User>>> {
    const { user, success, errorCode } =
      await this.authService.signUp(signUpDto);

    //intercepteur
    return this.responseService.format(user, success, errorCode);
  }

  @Throttle({ auth: {} })
  @Public()
  @Post('signIn')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<ResponseInterface<SignInOutputInterface>> {
    const data = await this.authService.signIn(signInDto);

    return this.responseService.format(data);
  }

  @TokenType('REFRESH')
  @Delete('logout')
  async logout(
    @Req() request: Request,
  ): Promise<ResponseInterface<Partial<UserToken>>> {
    const token = request['token'];
    const userToken = await this.authService.logout(token);
    return this.responseService.format(userToken);
  }

  @TokenType('REFRESH')
  @Post('refresh')
  async refresh(@Req() request: Request) {
    const token = request['token'];
    const data = await this.authService.refresh(token);
    return this.responseService.format(data);
  }

  /* ----------  ACCOUNT MANAGEMENT ------------------------------------------------------- */
  @Throttle({ auth: {} })
  @Public()
  @Post('reSendConfirmAccount')
  async reSendConfirmAccount(
    @Body() reSendConfirmAccountDto: ForgotPasswordDTO,
  ): Promise<ResponseInterface<boolean>> {
    await this.authService.reSendConfirmAccount(reSendConfirmAccountDto.email);
    return this.responseService.format(true);
  }

  @Throttle({ auth: {} })
  @Public()
  @Post('confirmAccount')
  async confirmAccount(
    @Body() confirmAccountDto: ConfirmAccountDto,
  ): Promise<ResponseInterface<Partial<User>>> {
    const user = await this.authService.confirmAccount(confirmAccountDto);
    return this.responseService.format(user);
  }

  @Public()
  @Throttle({ critical: {} })
  @Post('forgotPassword')
  async forgotPassword(
    @Body() forgotPasswordDTO: ForgotPasswordDTO,
  ): Promise<ResponseInterface<Partial<User>>> {
    const user = await this.authService.forgotPassword(forgotPasswordDTO.email);
    return this.responseService.format(user);
  }

  @Public()
  @Throttle({ critical: {} })
  @Post('resetPassword')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseInterface<Partial<User>>> {
    const user = await this.authService.resetPassword(resetPasswordDto);
    return this.responseService.format(user);
  }
}
