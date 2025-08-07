import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserInterface } from './interfaces/update-user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(
    data: SignUpDto,
    selectedColumn?: (keyof User)[]
  ): Promise<User> {

    return await this.userRepository.create(data, selectedColumn)
  }


  async update(
    id: number,
    data : UpdateUserInterface,
    selectedColumns?: (keyof User)[],
  ): Promise<Partial<User | null>> {
    return await this.userRepository.update(id, data, selectedColumns)
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




}
