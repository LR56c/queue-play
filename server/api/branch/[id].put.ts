import { isLeft }      from "fp-ts/Either"
import { z } from "zod"
import {
  parseData
}                      from "~~/core/modules/shared/application/parse_handlers"
import {
  branchResponse
} from "~~/core/modules/branch/application/branch_response"
import { branchService } from "~~/server/dependencies/dependencies"

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
  const dto  = await parseData( branchResponse, body )
  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await branchService.update( idParam.right.id, dto.right )
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
