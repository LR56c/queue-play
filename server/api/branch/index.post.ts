import { isLeft }        from "fp-ts/Either"
import {
  parseData
}                        from "@/core/modules/shared/application/parse_handlers"
import { branchService } from "@/server/dependencies/dependencies"
import {
  branchResponse
}                        from "@/core/modules/branch/application/branch_response"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )

  const dto = await parseData( branchResponse, body )
  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await branchService.add( dto.right)
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
