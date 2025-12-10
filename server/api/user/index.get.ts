import { isLeft }      from "fp-ts/Either"
import { parseData }   from "@@/core/modules/shared/application/parse_handlers"
import { querySchema } from "@@/core/modules/shared/application/query_dto"
import { userService } from "@@/server/dependencies/dependencies"

export default defineEventHandler( async ( event ) => {
  const queryParams = getQuery( event )
  const dto         = await parseData( querySchema, queryParams )
  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }
  const { query, limit, skip, sort_by, sort_type } = dto.right

  const result = await userService.search( query, limit ?? undefined,
    skip ?? undefined, sort_by ?? undefined,
    sort_type ?? undefined )
  if ( isLeft( result ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  return {
    statusMessage: "OK",
    statusCode   : 200,
    data         : result.right
  }
} )
