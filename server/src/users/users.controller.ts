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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/User.entitiy';
import { AuthGuard } from 'src/auth/auth.guard';
import { Protected } from 'src/auth/protected.decorator';
import { User } from './user.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/')
  @Protected()
  get(@User() user: UserEntity) {
    console.log('user', user);
    return this.usersService.findByEmail(user.email);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('/email/:email')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UserEntity })
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
