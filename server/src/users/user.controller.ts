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
    @Param("id", new ParseIntPipe())
    recordingId: number,
    @Body("newName") newName: string,
    @InjectUser() user: User
  ): Promise<RecordingEntity> {
    return await this.usersService.renameRecording(recordingId, newName);
  }

  @Get("/")
  @Protected()
  @ApiOkResponse({ type: UserEntity })
  @ApiName("getUser")
  get(@InjectUser() user: UserEntity) {
    console.log("user", user);
    return this.usersService.findByEmail(user.email);
  }

  @Get("/email/:email")
  @ApiOkResponse({ type: UserEntity })
  @ApiName("getUserByEmail")
  @Protected()
  findByEmail(@Param("email") email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get("/user/all")
  @ApiOkResponse({ type: [UserEntity] })
  @ApiName("getAllUsers")
  @Protected()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get("/:id/recordings")
  @ApiOkResponse({ type: [RecordingEntity] })
  @ApiName("getAllRecordings")
  getAllRecordings(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    return this.usersService.getAllUserRecordings(id);
  }

  @Post("/recordings/upload")
  @UseInterceptors(FileInterceptor("file"))
  @Protected()
  @ApiName("upload")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadRecording,
  })
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100_000_000 }),
          // new FileTypeValidator({ fileType: "video/mp4" }),
        ],
      })
    )
    file: Express.Multer.File,
    @InjectUser() user: User
  ): Promise<{ message: string }> {
    console.log("got controller");
    await this.usersService.uploadRecording(file, user);
    return { message: "File uploaded successfully" };
  }

  // @Patch(':id')
  // @ApiOkResponse({ type: UserEntity })
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}