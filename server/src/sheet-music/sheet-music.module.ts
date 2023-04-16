import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ApiName } from 'src/utils/api-name.decorator';
import { UtilsModule } from 'src/utils/utils.module';
import { SheetMusicController } from './sheet-music.controller';
import { SheetMusicService } from './sheet-music.service';

@Module({
  controllers: [SheetMusicController],
  providers: [SheetMusicService],
  imports: [AuthModule],
})
export class SheetMusicModule {}
