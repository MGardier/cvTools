import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.UserCreateInput,
    select?: Prisma.UserSelect,
  ): Promise<User> {
    return await this.prismaService.user.create({
      select: select ?? { id: true, email: true },
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findOneById(
    id: number,
    select?: Prisma.UserSelect,
  ): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      select: select ?? { id: true, email: true },
      where: { id },
    });
  }

  async findOneByEmail(
    email: string,
    select?: Prisma.UserSelect,
  ): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      select: select ?? { id: true, email: true },
      where: { email },
    });
  }

  async update(
    id: number,
    data: Prisma.UserUpdateInput,
    select?: Prisma.UserSelect,
  ): Promise<User> {
    return await this.prismaService.user.update({
      select: select ?? { id: true, email: true },
      where: { id },
      data,
    });
  }

  async remove(id: number, select?: Prisma.UserSelect): Promise<User> {
    try {
      return await this.prismaService.user.delete({
        select: select ?? { id: true, email: true },
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with Id :  ${id}  was not found`);
      }
      throw error;
    }
  }
}
