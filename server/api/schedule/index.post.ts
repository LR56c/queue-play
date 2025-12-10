import { isLeft }                  from "fp-ts/Either"
import {
  parseData
}                                  from "@@/core/modules/shared/application/parse_handlers"
import { schedulePlaylistService } from "@@/server/dependencies/dependencies"
import {
  schedulePlaylistResponse
}                                  from "@@/core/modules/schedule_playlist/application/schedule_playlist_response"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )

  const dto = await parseData( schedulePlaylistResponse, body )

  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await schedulePlaylistService.add( dto.right )
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
