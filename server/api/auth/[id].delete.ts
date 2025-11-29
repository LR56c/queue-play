import { isLeft }      from "fp-ts/Either"
import { parseData }   from "~~/core/modules/shared/application/parse_handlers"
import { userService } from "~~/server/dependencies/dependencies"
import { z } from "zod"

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
  const result = await userService.remove( idParam.right.id )

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
