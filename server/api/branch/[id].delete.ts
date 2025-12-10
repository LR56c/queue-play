import { isLeft }        from "fp-ts/Either"
import { z }             from "zod"
import {
  parseData
}                        from "~~/core/modules/shared/application/parse_handlers"
import { branchService } from "~~/server/dependencies/dependencies"

export default defineEventHandler( async ( event ) => {
  const idParam = getRouterParam(event, 'id')
  const param     = await parseData( z.object( {
    id: z.string()
  } ), {
    id: idParam
  } )
  if ( isLeft( param ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }
  const result = await branchService.remove( param.right.id )

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
