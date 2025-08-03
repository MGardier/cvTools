import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { User, UserRoles, UserStatus } from "@prisma/client";
import { UtilEntity } from "src/utils/UtilEntity";
import { SignUpDto } from "src/auth/dto/sign-up.dto";

@Injectable()
export class UserRepository {

  constructor(private readonly prismaService: PrismaService) { }

  async create(
    data: SignUpDto,
    selectedColumns?: (keyof User)[],
  ): Promise<User> {
    const select: Record<keyof User, boolean> | undefined = UtilEntity.getSelectedColumns<User>(selectedColumns);
    try {
      return await this.prismaService.user.create({
        select,
        data: {
          ...data,
          roles: UserRoles.USER,
          status: UserStatus.PENDING,
        }
      });
    }
    catch (e) {
      throw this.__handlePrismaError(e);
    }

  }

  /***************************************** FIND   ***************************************************************************************/
  async findOneById(
    id: number,
    selectedColumns?: (keyof User)[],
  ): Promise<User | null> {
    const select: Record<keyof User, boolean> | undefined = UtilEntity.getSelectedColumns<User>(selectedColumns);
    try {
      return await this.prismaService.user.findUnique({
        select,
        where: { id },
      });
    }
    catch (e) {
      throw this.__handlePrismaError(e);
    }

  }

  async findOneByEmail(
    email: string,
    selectedColumns?: (keyof User)[],
  ): Promise<User | null> {
    const select: Record<keyof User, boolean> | undefined = UtilEntity.getSelectedColumns<User>(selectedColumns);
    try {
      return await this.prismaService.user.findUnique({
        select,
        where: { email },
      });
    }
    catch (e) {
      throw this.__handlePrismaError(e);
    }
  }


  /***************************************** PRIVATE  ***************************************************************************************/

  private async __handlePrismaError(error: any) {
    switch (error.code) {
      case 'P2002':
        if (error.meta.target === 'user_email_key')
          return new BadRequestException('Un compte avec cette adresse e-mail existe déjà.');

        return new BadRequestException();

      default:
        return new InternalServerErrorException({ message: 'Database operation failed.' })
    }
  }

}