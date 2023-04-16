import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User as UserEntity } from "prisma/prisma-client";

export const InjectUser = createParamDecorator<any, any, UserEntity>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
