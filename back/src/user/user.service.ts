import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(
    data: SignUpDto,
    selectedColumn?: (keyof User)[]
  ): Promise<User> {

    return await this.userRepository.create(data, selectedColumn)
  }

  /***************************************** FIND   ***************************************************************************************/


  async findAll(selectedColumns?: (keyof User)[]): Promise<Partial<User[]>> {
    return await this.userRepository.findAll(selectedColumns);
  }

  async findOneById(
    id: number,
    selectedColumns?: (keyof User)[],
  ): Promise<Partial<User | null>> {
    return await this.userRepository.findOneById(id, selectedColumns)
  }

  async findOneByEmail(
    email: string,
    selectedColumns?: (keyof User)[],
  ): Promise<Partial<User | null>> {
    return await this.userRepository.findOneByEmail(email, selectedColumns)

  }


  // async update(
  //   id: number,
  //   data: Prisma.UserUpdateInput,
  //   select?: Prisma.UserSelect,
  // ): Promise<User> {

  //   return await this..update({
  //     select: select ?? { id: true, email: true },
  //     where: { id },
  //     data,
  //   });

  // }

  // async remove(id: number, select?: Prisma.UserSelect): Promise<User> {
  //   try {
  //     return await this.prismaService.user.delete({
  //       select: select ?? { id: true, email: true },
  //       where: { id },
  //     });
  //   } catch (error) {
  //     if (error.code === 'P2025') {
  //       throw new NotFoundException(`User with Id :  ${id}  was not found`);
  //     }
  //     throw error;
  //   }
  // }
}
