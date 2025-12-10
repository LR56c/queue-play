import { isLeft }      from "fp-ts/Either"
import { z }           from "zod"
import {
  parseData
}                      from "@/core/modules/shared/application/parse_handlers"
import { songService } from "@/server/dependencies/dependencies"
import {
  onGoingSongResponse
}                      from "@/core/modules/on_going_song/application/on_going_song_response"

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
  const body = await readBody( event )
  const dto  = await parseData( z.object({
    songs: z.array( onGoingSongResponse )
  }), body )
  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const result = await songService.update( dto.right.songs, param.right.id )
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
