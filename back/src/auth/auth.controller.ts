import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../auth/dto/sign-up.dto';

import { Public } from '../decorators/public.decorator';




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
  ) {
    
    //Pas oublier la gestion des erreurs 
     return  await this.authService.signUp(signUpDto);

    
  }


  // @Public()
  // @Post('signIn')
  // async signIn(
  //   @Body() signInDto: SignInDto,
  // ): Promise<ResponseInterface<SignInOutputInterface>> {
  //   const data = await this.authService.signIn(signInDto);

  //   return this.responseService.format(data);
  // }

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

  // @Public()
  // @Post('reSendConfirmAccount')
  // async reSendConfirmAccount(
  //   @Body() reSendConfirmAccountDto: ForgotPasswordDTO,
  // ): Promise<ResponseInterface<boolean>> {
  //   await this.authService.reSendConfirmAccount(reSendConfirmAccountDto.email);
  //   return this.responseService.format(true);
  // }


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
