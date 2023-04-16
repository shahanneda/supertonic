import { Test, TestingModule } from "@nestjs/testing";
import { SheetMusicController } from "./sheet-music.controller";

describe("SheetMusicController", () => {
  let controller: SheetMusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheetMusicController],
    }).compile();

    controller = module.get<SheetMusicController>(SheetMusicController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
