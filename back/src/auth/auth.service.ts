import {
  Injectable,
  InternalServerErrorException,
  Logger,

} from '@nestjs/common';


import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserTokenService } from '../user-token/user-token.service';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/sign-up.dto';


import { TokenType } from 'src/user-token/enum/token-type.enum';
import { User } from '@prisma/client';
import { SignUpOptionsInterface } from './interfaces/sign-up-options.interface';

@Injectable()
export class AuthService {
  private readonly logger;
  constructor(
    private readonly userTokenService: UserTokenService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger('AuthService');
  }


  /***************************************** AUTHENTIFICATION ***************************************************************************************/


  async signUp(data: SignUpDto, options?: SignUpOptionsInterface): Promise<Pick<User, "id" | 'email'>> {

    const hashedPassword = await this.__hashPassword(data.password);

    const user = await this.userService.create(
      {
        email: data.email,
        password: hashedPassword,
      },
      options?.userSelectedColumn
    );

    const token = await this.userTokenService.generateAndSave(
      { sub: user.id, email: user.email },
      TokenType.CONFIRM_ACCOUNT,
      options?.userTokenSelectedColumn
    );

    await this.emailService.sendAccountConfirmationLink(
      user.email,
      `${this.configService.get('FRONT_URL_CONFIRMATION_ACCOUNT')}/${token}`,
    );

    return user;
  }


  // async sendConfirmAccount(
  //   email: string,
  // ): Promise<SendConfirmAccountOutputInterface> {

  //   const userId = await this.userService.findOneByEmail(email, ['id']);

  //   const token = await this.userTokenService.generate(userId, email, TokenType.CONFIRM_ACCOUNT);

  //   await this.emailService.sendAccountConfirmationLink(
  //     email,
  //     `${this.configService.get('FRONT_URL_CONFIRMATION_ACCOUNT')}/${token}`,
  //   );

  //   return true;
  // }

  // async signIn(data: SignInDto): Promise<SignInOutputInterface> {
  //   const user = await this.userService.findOneByEmail(data.email, {
  //     id: true,
  //     email: true,
  //     password: true,
  //   });

  //   if (
  //     !user ||
  //     !user?.password ||
  //     !(await bcrypt.compare(data.password, user.password))
  //   )
  //     throw new UnauthorizedException('Invalid credentials');
  //   if (user.status === UserStatus.PENDING)
  //     throw new UnauthorizedException('User must be valid his account');
  //   if (user.status === UserStatus.BANNED)
  //     throw new UnauthorizedException('User is banned and cannot login ');

  //   const accessToken = await this.userTokenService.generate({
  //     payload: {
  //       email: user.email,
  //       sub: user.id,
  //     },
  //     expiresKey: 'ACCESS',
  //     secretKey: 'ACCESS',
  //   });
  //   let uuid: string = this.__createUuid();
  //   const refreshToken = await this.userTokenService.generate({
  //     payload: {
  //       email: user.email,
  //       sub: user.id,
  //       uuid,
  //     },
  //     expiresKey: 'REFRESH',
  //     secretKey: 'REFRESH',
  //     type: TokenType.REFRESH,
  //   });

  //   return { accessToken, refreshToken };
  // }

  // async logout(token: string): Promise<Partial<UserToken>> {
  //   const { userToken, payload } = await this.userTokenService.decode({
  //     token,
  //     secretKey: 'REFRESH',
  //     type: TokenType.REFRESH,
  //   });
  //   if (!userToken) throw new UnauthorizedException('No token was found ');

  //   const user = await this.userService.findOneById(+payload.sub);
  //   if (!user) throw new UnauthorizedException('User was not found');

  //   return await this.userTokenService.remove(userToken.id);
  // }

  // async refresh(token: string): Promise<SignInOutputInterface> {
  //   const { userToken, payload } = await this.userTokenService.decode({
  //     token,
  //     secretKey: 'REFRESH',
  //     type: TokenType.REFRESH,
  //   });

  //   if (!userToken) throw new UnauthorizedException('No token was found ');

  //   const user = await this.userService.findOneById(+payload.sub);
  //   if (!user) throw new UnauthorizedException('User was not found');

  //   const { accessToken, refreshToken } = await this.__generateTokenPair(
  //     user.email,
  //     user.id,
  //   );

  //   await this.userTokenService.remove(userToken.id);
  //   return { accessToken, refreshToken };
  // }

  // /* ----------  ACCOUNT MANAGEMENT ------------------------------------------------------- */

  // async reSendConfirmAccount(email: string): Promise<void> {
  //   const user = await this.userService.findOneByEmail(email);
  //   if (!user) return;
  //   await this.__sendConfirmAccount({
  //     email: user.email,
  //     userId: user.id,
  //     isFallback: false,
  //   });
  // }

  // async confirmAccount(
  //   confirmAccountDto: ConfirmAccountDto,
  // ): Promise<Partial<User>> {
  //   const { userToken, payload } = await this.userTokenService.decode({
  //     token: confirmAccountDto.token,
  //     secretKey: 'DEFAULT',
  //     type: TokenType.CONFIRM_ACCOUNT,
  //   });
  //   if (!userToken)
  //     throw new NotFoundException(
  //       'No confirm account token was found for this user',
  //     );

  //   const user = await this.userService.update(payload.sub, {
  //     status: UserStatus.ALLOWED,
  //   });

  //   await this.userTokenService.remove(userToken.id);
  //   return user;
  // }

  // async forgotPassword(email: string): Promise<Partial<User>> {
  //   const user = await this.userService.findOneByEmail(email);
  //   if (!user) throw new NotFoundException();

  //   let uuid: string = this.__createUuid();

  //   const token = await this.userTokenService.generate({
  //     payload: {
  //       email: user.email,
  //       sub: user.id,
  //       uuid,
  //     },
  //     expiresKey: 'FORGOT_PASSWORD',
  //     secretKey: 'FORGOT_PASSWORD',
  //     type: TokenType.FORGOT_PASSWORD,
  //   });

  //   await this.emailService.sendResetPasswordLink(
  //     user.email,
  //     `${this.configService.get('FRONT_URL_RESET_PASSWORD')}/${token}`,
  //   );

  //   return user;
  // }

  // async resetPassword(data: ResetPasswordDto): Promise<Partial<User>> {
  //   const { userToken, payload } = await this.userTokenService.decode({
  //     token: data.token,
  //     secretKey: 'FORGOT_PASSWORD',
  //     type: TokenType.FORGOT_PASSWORD,
  //   });
  //   if (!userToken) throw new NotFoundException('Token was not found ');
  //   const hashedPassword = await this.__hashPassword(data.password);
  //   const user = await this.userService.update(payload.sub, {
  //     password: hashedPassword,
  //   });
  //   if (!user) throw new NotFoundException('User was not found ');
  //   await this.userTokenService.remove(userToken.id);
  //   return user;
  // }



  /********************************************* PRIVATE METHOD *********************************************************************************************** */

  private async __hashPassword(password: string) {
    const saltRound = Number(this.configService.get('HASH_SALT_ROUND')) || 12;
    return await bcrypt.hash(password, saltRound);

  }

}
