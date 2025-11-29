import { isLeft }      from "fp-ts/Either"
import {
  parseData
}                      from "~~/core/modules/shared/application/parse_handlers"
import {
  userResponseSchema
}                      from "~~/core/modules/user/application/user_response"
import { userService } from "~~/server/dependencies/dependencies"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )

  const dto = await parseData( userResponseSchema, body )

  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await userService.add( dto.right, 'user' )
  if ( isLeft( result ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }
  // setHeader( event, "ut", await signJwt( result.right ) )
  return {
    statusMessage: "OK",
    statusCode   : 200
  }
} )
