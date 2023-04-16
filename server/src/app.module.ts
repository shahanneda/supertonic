import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { SheetMusicModule } from './sheet-music/sheet-music.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [UserModule, AuthModule, SheetMusicModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
