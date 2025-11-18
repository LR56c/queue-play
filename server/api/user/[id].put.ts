import { isLeft }      from "fp-ts/Either"
import { z } from "zod"
import {
  parseData
}                      from "~~/core/modules/shared/application/parse_handlers"
import {
  userUpdateSchema
}                      from "~~/core/modules/user/application/user_update_dto"
import { userService } from "~~/server/dependencies/dependencies"

export default defineEventHandler( async ( event ) => {
  const queryParams = getQuery( event )
  const idParam     = await parseData( z.object( {
    id: z.string()
  } ), queryParams )
  if ( isLeft( idParam ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }
  const body = await readBody( event )
  const dto  = await parseData( userUpdateSchema, body )
  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await userService.update( idParam.right.id, dto.right )
  if ( isLeft( result ) ) {

    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }
  return {
    statusMessage: "OK",
    statusCode   : 200
  }
} )
