import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [AuthService, UserService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
