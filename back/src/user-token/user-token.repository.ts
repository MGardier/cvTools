import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { PrismaTokenType, UserToken } from '@prisma/client';
import { UtilEntity } from "src/utils/UtilEntity";
import { TokenType } from "./enum/token-type.enum";

@Injectable()
export class UserTokenRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}


  async create(
    token: string, 
    type : TokenType,
    expiresIn : Date,
    userId :number,
    uuid? : string,
    selectedColumns?: (keyof UserToken)[],
   
  ): Promise<UserToken> {
    const select: Record<keyof UserToken, boolean> | undefined = UtilEntity.getSelectedColumns<UserToken>(selectedColumns);
    return await this.prismaService.userToken.create({
      select,
      data: {
        token,
        type : this.__toPrismaTokenType(type),
        expiresIn,
        ...(uuid ? { uuid } : {}),
        user: { connect: { id: userId } },
      },
    });
  }


//  async remove(
//     id: number,
//     select ?: Prisma.UserTokenSelect,
//   ): Promise < UserToken | Pick < UserToken, 'id' >> {
//     try {
//       return await this.prismaService.userToken.delete({
//         select: select ?? { id: true, type: true, uuid: true },
//         where: {
//           id,
//         },
//       });
//     } catch(error) {
//       if (error.code === 'P2025') {
//         throw new NotFoundException(
//           `UserToken with Id :  ${id}  was not found`,
//         );
//       }
//       throw error;
//     }
//   }

//   }



/********************************************* PRIVATE METHOD *********************************************************************************************** */


  // private async __findByUuid(uuid: string): Promise<UserToken | null> {
  //   return await this.prismaService.userToken.findUnique({
  //     where: {
  //       uuid,
  //     },
  //   });
  // }

    private  __toPrismaTokenType(tokenType: TokenType): PrismaTokenType  {
        const mapping = {
            [TokenType.REFRESH]: PrismaTokenType.REFRESH,
            [TokenType.FORGOT_PASSWORD]: PrismaTokenType.FORGOT_PASSWORD,
            [TokenType.CONFIRM_ACCOUNT]: PrismaTokenType.CONFIRM_ACCOUNT
        };
        return mapping[tokenType];
    }
}
