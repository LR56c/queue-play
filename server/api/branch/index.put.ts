import { isLeft }        from "fp-ts/Either"
import {
  parseData
}                        from "~~/core/modules/shared/application/parse_handlers"
import {
  branchResponse
}                        from "~~/core/modules/branch/application/branch_response"
import { branchService } from "~~/server/dependencies/dependencies"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )
  const dto  = await parseData( branchResponse, body )
  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await branchService.update( dto.right )
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
