import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../auth/dto/sign-up.dto';

import { Public } from '../decorators/public.decorator';
import { User } from '@prisma/client';
import { SignInDto } from './dto/sign-in.dto';
import { SignInOutputInterface } from './interfaces/sign-in.output.interface';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';




@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) { }

  /***************************************** AUTHENTIFICATION ***************************************************************************************/

  @Public()
  @Post('signUp')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ) : Promise<Pick<User,"id" | 'email'>> {
    
     return  await this.authService.signUp(signUpDto,{
      userSelectedColumn :["id","email"],
      userTokenSelectedColumn : ["id"]
     });

  }


  @Public()
  @Post('signIn')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<SignInOutputInterface> {
    return await this.authService.signIn(signInDto);

  }

  // @TokenType('REFRESH')
  // @Delete('logout')
  // async logout(
  //   @Req() request: Request,
  // ): Promise<ResponseInterface<Partial<UserToken>>> {
  //   const token = request['token'];
  //   const userToken = await this.authService.logout(token);
  //   return this.responseService.format(userToken);
  // }

  // @TokenType('REFRESH')
  // @Post('refresh')
  // async refresh(@Req() request: Request) {
  //   const token = request['token'];
  //   const data = await this.authService.refresh(token);
  //   return this.responseService.format(data);
  // }

  // /* ----------  ACCOUNT MANAGEMENT ------------------------------------------------------- */

  @Public()
  @Post('sendConfirmAccount')
  async sendConfirmAccount(
    @Body() sendConfirmAccountDto: ForgotPasswordDTO,
  ): Promise<boolean> {

    return await this.authService.sendConfirmAccount(sendConfirmAccountDto.email);
    
  }


  // @Public()
  // @Post('confirmAccount')
  // async confirmAccount(
  //   @Body() confirmAccountDto: ConfirmAccountDto,
  // ): Promise<ResponseInterface<Partial<User>>> {
  //   const user = await this.authService.confirmAccount(confirmAccountDto);
  //   return this.responseService.format(user);
  // }

  // @Public()
  // @Post('forgotPassword')
  // async forgotPassword(
  //   @Body() forgotPasswordDTO: ForgotPasswordDTO,
  // ): Promise<ResponseInterface<Partial<User>>> {
  //   const user = await this.authService.forgotPassword(forgotPasswordDTO.email);
  //   return this.responseService.format(user);
  // }

  // @Public()
  // @Post('resetPassword')
  // async resetPassword(
  //   @Body() resetPasswordDto: ResetPasswordDto,
  // ): Promise<ResponseInterface<Partial<User>>> {
  //   const user = await this.authService.resetPassword(resetPasswordDto);
  //   return this.responseService.format(user);
  // }
}
