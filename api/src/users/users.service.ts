import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll(query: { page: number; per_page: number }) {
    const { page, per_page } = query;
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * per_page,
      take: per_page,
    });
    const total = await this.prisma.user.count();
    return {
      users: users,
      total,
    };
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );

      updateUserDto.password = hashedPassword;
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
