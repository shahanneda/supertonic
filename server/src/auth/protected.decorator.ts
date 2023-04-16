import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import {
  ApiHeader,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/User.entitiy";
import { AuthGuard } from "./auth.guard";

export function Protected(..._: string[]) {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiHeader({ name: "Authorization", description: "Bearer token" }),
    ApiUnauthorizedResponse({ description: "Unauthorized" })
  );
}
