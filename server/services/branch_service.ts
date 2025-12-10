import { isLeft, left, right, type Either } from "fp-ts/Either"
import type {
  PaginatedResult
} from "@@/core/modules/shared/domain/paginated_result"
import {
  BaseException
}                                           from "@@/core/modules/shared/domain/exceptions/base_exception"
import {
  AddBranch
}                                           from "@@/core/modules/branch/application/add_branch"
import {
  SearchBranch
}                                           from "@@/core/modules/branch/application/search_branch"
import { RemoveBranch } from "@@/core/modules/branch/application/remove_branch"
import { UpdateBranch } from "@@/core/modules/branch/application/update_branch"
import {
  BranchResponse
}                                           from "@@/core/modules/branch/application/branch_response"
import {
  BranchMapper
}                                           from "@@/core/modules/branch/application/branch_mapper"

export class BranchService {
  constructor(
    private readonly addBranch: AddBranch,
    private readonly searchBranch: SearchBranch,
    private readonly removeBranch: RemoveBranch,
    private readonly updateBranch: UpdateBranch
  )
  {
  }

  async add( request: BranchResponse ): Promise<Either<BaseException[], boolean>> {
    const result = await this.addBranch.execute( request )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }

  async search( query: Record<string, any>, limit?: number,
    skip ?: string, sortBy ?: string,
    sortType ?: string ): Promise<Either<BaseException[], PaginatedResult<BranchResponse>>> {
    const result = await this.searchBranch.execute( query, limit, skip, sortBy,
      sortType )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( {
      items: result.right.items.map( BranchMapper.toDTO ),
      total: result.right.total
    } )
  }

  async remove( id: string ): Promise<Either<BaseException[], boolean>> {
    return await this.removeBranch.execute( id )
  }

  async update( dto: BranchResponse ): Promise<Either<BaseException[], boolean>> {
    const result = await this.updateBranch.execute( dto )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }
}
