import { AddUser } from "~~/core/modules/user/application/add_user"
import {
  SearchUser
} from "~~/core/modules/user/application/search_user"
import {
  RemoveUser
} from "~~/core/modules/user/application/remove_user"
import {
  UpdateUser
} from "~~/core/modules/user/application/update_user"
import { isLeft, left, right, type Either } from "fp-ts/Either"
import {
  BaseException
} from "~~/core/modules/shared/domain/exceptions/base_exception"
import type {
  UserUpdateDTO
} from "~~/core/modules/user/application/user_update_dto"
import {
  UserMapper
} from "~~/core/modules/user/application/user_mapper"
import {
  UserResponse
} from "~~/core/modules/user/application/user_response"
import type {
  PaginatedResult
} from "~~/core/modules/shared/domain/paginated_result"

export class UserService {
  constructor(
    private readonly searchUser: SearchUser,
  )
  {
  }


  async search( query: Record<string, any>, limit?: number,
    skip ?: string, sortBy ?: string,
    sortType ?: string ): Promise<Either<BaseException[], PaginatedResult<UserResponse>>> {
    const result = await this.searchUser.execute( query, limit, skip, sortBy,
      sortType )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( {
      items: result.right.items.map( UserMapper.toDTO ),
      total: result.right.total
    } )
  }
}
