import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: { email: createUserDto.email, name: createUserDto.name },
    });

    return user;
  }

  async getUserOrCreateByEmail(email: string, name: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email: email } });

    if (user) {
      console.log("Found user", user);
      return user;
    }

    console.log("making user");
    const newUser = await this.create({ email, name });
    return newUser;
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ where: { id: id } });
  }

  findByEmail(email: string) {
    console.log("getting for ", email);
    return this.prisma.user.findFirst({ where: { email: email } });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
