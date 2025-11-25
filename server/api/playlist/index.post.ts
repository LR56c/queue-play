import { isLeft }          from "fp-ts/Either"
import {
  parseData
}                          from "~~/core/modules/shared/application/parse_handlers"
import { playlistService } from "~~/server/dependencies/dependencies"
import {
  playlistResponse
}                          from "~~/core/modules/playlist/application/playlist_response"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )

  const dto = await parseData( playlistResponse, body )

  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await playlistService.add( dto.right, 'user' )
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
