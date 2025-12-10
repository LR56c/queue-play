import { isLeft, left, right, type Either } from "fp-ts/Either"
import {
  BaseException
}                                           from "@/core/modules/shared/domain/exceptions/base_exception"
import type {
  PaginatedResult
}                                           from "@/core/modules/shared/domain/paginated_result"
import {
  AddPlaylist
}                                           from "@/core/modules/playlist/application/add_playlist"
import {
  PlaylistResponse
}                                           from "@/core/modules/playlist/application/playlist_response"
import {
  SearchPlaylist
}                                           from "@/core/modules/playlist/application/search_playlist"
import {
  RemovePlaylist
}                                           from "@/core/modules/playlist/application/remove_playlist"
import {
  UpdatePlaylist
}                                           from "@/core/modules/playlist/application/update_playlist"
import {
  PlaylistMapper
}                                           from "@/core/modules/playlist/application/playlist_mapper"

export class PlaylistService {
  constructor(
    private readonly addPlaylist: AddPlaylist,
    private readonly searchPlaylist: SearchPlaylist,
    private readonly removePlaylist: RemovePlaylist,
    private readonly updatePlaylist: UpdatePlaylist
  )
  {
  }

  async add( dto: PlaylistResponse): Promise<Either<BaseException[], boolean>> {
    const result = await this.addPlaylist.execute( dto)
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }

  async search( query: Record<string, any>, limit?: number,
    skip ?: string, sortBy ?: string,
    sortType ?: string ): Promise<Either<BaseException[], PaginatedResult<PlaylistResponse>>> {
    const result = await this.searchPlaylist.execute( query, limit, skip, sortBy,
      sortType )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( {
      items: result.right.items.map( PlaylistMapper.toDTO ),
      total: result.right.total
    } )
  }

  async remove(id: string): Promise<Either<BaseException[], boolean>> {
    return await this.removePlaylist.execute( id)
  }

  async update( dto: PlaylistResponse ): Promise<Either<BaseException[], boolean>> {
    const result = await this.updatePlaylist.execute( dto )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }
}
