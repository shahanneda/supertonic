import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { AuthService } from "./auth.service";

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
