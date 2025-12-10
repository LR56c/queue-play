import { isLeft }      from "fp-ts/Either"
import {
  parseData
}                      from "@/core/modules/shared/application/parse_handlers"
import { songService } from "@/server/dependencies/dependencies"
import {
  onGoingSongResponse
}                      from "@/core/modules/on_going_song/application/on_going_song_response"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )

  const dto = await parseData( onGoingSongResponse, body )

  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await songService.add( dto.right )
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
