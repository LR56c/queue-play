import { isLeft, left, right, type Either } from "fp-ts/Either"
import {
  BaseException
}                                           from "~~/core/modules/shared/domain/exceptions/base_exception"
import type {
  PaginatedResult
}                                           from "~~/core/modules/shared/domain/paginated_result"
import {
  AddSong
}                                           from "~~/core/modules/on_going_song/application/add_song"
import {
  RemoveSongsBullk
}                                           from "~~/core/modules/on_going_song/application/remove_songs_bullk"
import {
  UpdateSongsBulk
}                                           from "~~/core/modules/on_going_song/application/update_songs_bulk"
import {
  SearchSongs
}                                           from "~~/core/modules/on_going_song/application/search_songs"
import {
  OnGoingSongResponse
}                                           from "~~/core/modules/on_going_song/application/on_going_song_response"
import {
  OnGoingSongMapper
}                                           from "~~/core/modules/on_going_song/application/on_going_song_mapper"

export class SongService {
  constructor(
    private readonly addSong: AddSong,
    private readonly searchSong: SearchSongs,
    private readonly removeSong: RemoveSongsBullk,
    private readonly updateSong: UpdateSongsBulk
  )
  {
  }

  async add( request: OnGoingSongResponse,
    role: string ): Promise<Either<BaseException[], boolean>> {
    const result = await this.addSong.execute( request )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }

  async search( query: Record<string, any>, limit?: number,
    skip ?: string, sortBy ?: string,
    sortType ?: string ): Promise<Either<BaseException[], PaginatedResult<OnGoingSongResponse>>> {
    const result = await this.searchSong.execute( query, limit, skip, sortBy,
      sortType )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( {
      items: result.right.items.map( OnGoingSongMapper.toDTO ),
      total: result.right.total
    } )
  }

  async remove( ids: string[],
    branchId: string ): Promise<Either<BaseException[], boolean>> {
    return await this.removeSong.execute( ids, branchId )
  }

  async update( dtos: OnGoingSongResponse[],
    branchId: string ): Promise<Either<BaseException[], boolean>> {
    const result = await this.updateSong.execute( dtos, branchId )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }
}
