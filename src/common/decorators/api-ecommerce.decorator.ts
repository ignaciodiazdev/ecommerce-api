import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiGetRelatedOperation(
  parent: string,
  child: string,
  responseType?: any
) {
  return applyDecorators(
    ApiOperation({ summary: `Obtener ${child} de ${parent}` }),
    ApiResponse({ 
      status: 200, 
      description: `Lista de ${child} de ${parent}.`,
      type: responseType 
    }),
    ApiResponse({ status: 404, description: `${parent} no encontrado.` })
  );
}