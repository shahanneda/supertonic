import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { UserEntity } from "./entities/User.entitiy";
import { AuthGuard } from "src/auth/auth.guard";
import { Protected } from "src/auth/protected.decorator";
import { InjectUser } from "./user.decorator";
import { ApiName } from "src/utils/api-name.decorator";
import { RecordingEntity } from "./entities/Recording.entity";
import { User } from "@prisma/client";
import { UploadRecording } from "./dto/upload-recording.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // Rest of the code...

  @Patch("/recordings/:id")
  @Protected()
  @ApiName("renameRecording")
  @ApiOkResponse({ type: RecordingEntity })
  async renameRecording(
    @Param("id", new ParseIntPipe()) recordingId: number,
    @Body("newName") newName: string,
    @InjectUser() user: User
  ): Promise<RecordingEntity> {
    return await this.usersService.renameRecording(recordingId, newName);
  }
}