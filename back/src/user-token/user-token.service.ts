import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, UserToken } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserTokenDecodeInputInterface } from './interfaces/decode/user-token-decode-input.interface';
import { UserTokenDecodeOutputInterface } from './interfaces/decode/user-token-decode-output.interface';
import { JwtManagerService } from '../jwt-manager/jwt-manager.service';
import { UserTokenGenerateInputInterface } from './interfaces/generate/user-token-generate-input.interface';

@Injectable()
export class UserTokenService {
  constructor(
    private readonly jwtManagerService: JwtManagerService,
    private readonly prismaService: PrismaService,
  ) {}

  async remove(
    id: number,
    select?: Prisma.UserTokenSelect,
  ): Promise<UserToken | Pick<UserToken, 'id'>> {
    try {
      return await this.prismaService.userToken.delete({
        select: select ?? { id: true, type: true, uuid: true },
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `UserToken with Id :  ${id}  was not found`,
        );
      }
      throw error;
    }
  }

  async generate(settings: UserTokenGenerateInputInterface): Promise<string> {
    const uuid = settings.payload.uuid;

    const { token, expiresIn } = await this.jwtManagerService.generate(
      settings.payload,
      settings.secretKey,
      settings.expiresKey,
    );
    if (settings.type)
      await this.__create({
        token,
        type: settings.type,
        expiresIn: this.__convertExpiresToDate(expiresIn),
        user: { connect: { id: +settings.payload.sub } },
        ...(uuid ? { uuid } : {}),
      });

    return token;
  }

  async decode(
    settings: UserTokenDecodeInputInterface,
  ): Promise<UserTokenDecodeOutputInterface> {
    let userToken;
    const payload = await this.jwtManagerService.verify(
      settings.token,
      settings.secretKey,
    );

    if (settings.type && payload.uuid)
      userToken = await this.__findByUuid(payload.uuid);

    return userToken ? { userToken, payload } : { payload };
  }

  /********************************************* PRIVATE FUNCTION *********************************************/

  private async __create(
    data: Prisma.UserTokenCreateInput,
    select?: Prisma.UserTokenSelect,
  ): Promise<UserToken> {
    return await this.prismaService.userToken.create({
      select: select ?? { id: true },
      data,
    });
  }

  private async __findByUuid(uuid: string): Promise<UserToken | null> {
    return await this.prismaService.userToken.findUnique({
      where: {
        uuid,
      },
    });
  }

  //Déplacer dans utils
  private __convertExpiresToDate(expiresIn: number): Date {
    return new Date(new Date().getTime() + expiresIn * 1000);
  }
}
