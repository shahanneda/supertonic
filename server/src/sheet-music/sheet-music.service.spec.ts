import { Test, TestingModule } from '@nestjs/testing';
import { SheetMusicService } from './sheet-music.service';

describe('SheetMusicService', () => {
  let service: SheetMusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheetMusicService],
    }).compile();

    service = module.get<SheetMusicService>(SheetMusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
