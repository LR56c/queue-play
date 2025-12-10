import { isLeft, left, right, type Either } from "fp-ts/Either"
import type {
  PaginatedResult
} from "@/core/modules/shared/domain/paginated_result"
import {
  AddBannedSong
}                                           from "@/core/modules/banned_song/application/add_banned_song"
import {
  SearchBannedSong
}                                           from "@/core/modules/banned_song/application/search_banned_song"
import {
  UpdateBannedSong
} from "@/core/modules/banned_song/application/update_banned_song"
import {
  BannedSongResponse
}                                           from "@/core/modules/banned_song/application/banned_song_response"
import {
  BaseException
}                                           from "@/core/modules/shared/domain/exceptions/base_exception"
import {
  BannedSongMapper
}                                           from "@/core/modules/banned_song/application/banned_song_mapper"
import  {
  RemoveBannedSong
} from "@/core/modules/banned_song/application/remove_banned_song"

export class BannedSongService {
  constructor(
    private readonly addBannedSong: AddBannedSong,
    private readonly searchBannedSong: SearchBannedSong,
    private readonly removeBannedSong: RemoveBannedSong,
    private readonly updateBannedSong: UpdateBannedSong
  )
  {
  }

  async add( request: BannedSongResponse): Promise<Either<BaseException[], boolean>> {
    const result = await this.addBannedSong.execute( request)
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }

  async search( query: Record<string, any>, limit?: number,
    skip ?: string, sortBy ?: string,
    sortType ?: string ): Promise<Either<BaseException[], PaginatedResult<BannedSongResponse>>> {
    const result = await this.searchBannedSong.execute( query, limit, skip, sortBy,
      sortType )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( {
      items: result.right.items.map( BannedSongMapper.toDTO ),
      total: result.right.total
    } )
  }

  async remove( id: string ): Promise<Either<BaseException[], boolean>> {
    return await this.removeBannedSong.execute( id )
  }

  async update( dto: BannedSongResponse ): Promise<Either<BaseException[], boolean>> {
    const result = await this.updateBannedSong.execute( dto )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }
}
