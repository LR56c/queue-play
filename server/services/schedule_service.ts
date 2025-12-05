import { isLeft, left, right, type Either } from "fp-ts/Either"
import {
  BaseException
}                                           from "~~/core/modules/shared/domain/exceptions/base_exception"
import type {
  PaginatedResult
}                                           from "~~/core/modules/shared/domain/paginated_result"
import {
  SchedulePlaylistMapper
}                                           from "~~/core/modules/schedule_playlist/application/schedule_playlist_mapper"
import {
  SchedulePlaylistResponse
}                                           from "~~/core/modules/schedule_playlist/application/schedule_playlist_response"
import {
  AddSchedulePlaylist
}                                           from "~~/core/modules/schedule_playlist/application/add_schedule_playlist"
import {
  RemoveSchedulePlaylist
}                                           from "~~/core/modules/schedule_playlist/application/remove_schedule_playlist"
import {
  UpdateSchedulePlaylist
}                                           from "~~/core/modules/schedule_playlist/application/update_schedule_playlist"
import {
  SearchSchedulePlaylist
}                                           from "~~/core/modules/schedule_playlist/application/search_schedule_playlist"

export class ScheduleService {
  constructor(
    private readonly addSchedule: AddSchedulePlaylist,
    private readonly searchSchedule: SearchSchedulePlaylist,
    private readonly removeSchedule: RemoveSchedulePlaylist,
    private readonly updateSchedule: UpdateSchedulePlaylist
  )
  {
  }

  async add( dto: SchedulePlaylistResponse ): Promise<Either<BaseException[], boolean>> {
    const result = await this.addSchedule.execute( dto )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }

  async search( query: Record<string, any>, limit?: number,
    skip ?: string, sortBy ?: string,
    sortType ?: string ): Promise<Either<BaseException[], PaginatedResult<SchedulePlaylistResponse>>> {
    const result = await this.searchSchedule.execute( query, limit, skip, sortBy,
      sortType )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( {
      items: result.right.items.map( SchedulePlaylistMapper.toDTO ),
      total: result.right.total
    } )
  }

  async remove(id:string): Promise<Either<BaseException[], boolean>> {
    return await this.removeSchedule.execute( id)
  }

  async update( dto: SchedulePlaylistResponse ): Promise<Either<BaseException[], boolean>> {
    const result = await this.updateSchedule.execute( dto )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }
}
