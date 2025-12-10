import { isLeft }            from "fp-ts/Either"
import {
  parseData
}                            from "@@/core/modules/shared/application/parse_handlers"
import { bannedSongService } from "@@/server/dependencies/dependencies"
import {
  bannedSongResponse
}                            from "@@/core/modules/banned_song/application/banned_song_response"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )

  const dto = await parseData( bannedSongResponse, body )

  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await bannedSongService.add( dto.right )
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
