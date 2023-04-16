import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function ApiName(apiMethodName) {
  return applyDecorators(ApiOperation({ operationId: apiMethodName }));
}
