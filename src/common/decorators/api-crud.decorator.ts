import { applyDecorators, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiCreateOperation(resource: string, type?: any){
  return applyDecorators(
    ApiOperation({ summary: `Crear ${resource}` }),
    ApiResponse({ status: 201, description: `${resource} creado correctamente.`, type}),
    ApiResponse({ status: 400, description: 'Datos invalidos.' }),
    ApiResponse({ status: 403, description: 'No Autorizado.' }),
  )
}

export function ApiGetAllOperation(resource: string, type?: any){
  return applyDecorators(
    ApiOperation({ summary: `Obtener todos los los ${resource}`}),
    ApiResponse({ status: 200, description: `Lista de ${resource}.`, type, isArray: true }),
  )
}

export function ApiGetOneOperation(resource: string, type?: any){
  return applyDecorators(
    ApiOperation({ summary: `Obtener ${resource} por ID` }),
    ApiResponse({ status: 200, description: `${resource} encontrado.`, type }),
    ApiResponse({ status: 404, description: `${resource} no encontrado.` }),
  )
}

export function ApiUpdateOperation(resource: string, type?: any){
  return applyDecorators(
    ApiOperation({ summary: `Actualizar ${resource} por ID` }),
    ApiResponse({ status: 200, description: `${resource} actualizado.`, type }),
    ApiResponse({ status: 404, description: `${resource} no encontrado.` }),
    ApiResponse({ status: 403, description: 'No autorizado.' }),
  )
}

export function ApiDeleteOperation(resource: string){
  return applyDecorators(
    ApiOperation({ summary: `Eliminar ${resource} por ID`}),
    ApiResponse({ status: 204, description: `${resource} eliminado.` }),
    ApiResponse({ status: 404, description: `${resource} no encontrado.`}),
    ApiResponse({ status: 403, description: 'No autorizado.' }),
    HttpCode(HttpStatus.NO_CONTENT)
  )
}