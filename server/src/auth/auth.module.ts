import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [AuthService, UsersService, PrismaService],
})
export class AuthModule {}
