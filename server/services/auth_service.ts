import { RemoveAuth }                  from "../../core/modules/auth/application/remove_auth"
import {
  UpdateAuth
}                                      from "../../core/modules/auth/application/update_auth"
import { Either, isLeft, left, right } from "fp-ts/Either"
import {
  BaseException
}                                      from "../../core/modules/shared/domain/exceptions/base_exception"
import {
  RegisterAuth
}                                      from "../../core/modules/auth/application/register_auth"
import {
  UserRequest
}                                      from "../../core/modules/user/application/user_request"
import {
  PasswordDTO
}                                      from "../../core/modules/shared/domain/value_objects/password"
import {
  UserUpdateDTO
}                                      from "../../core/modules/user/application/user_update_dto"
import {
  UserMapper
}                                      from "../../core/modules/user/application/user_mapper"
import {
  UserResponse
}                                      from "../../core/modules/user/application/user_response"
import {
  LoginRequest
}                                      from "../../core/modules/auth/domain/login_request"
import {
  JWTRepository
}                                      from "../../core/modules/auth/domain/jwt_repository"
import {
  AuthAdminResponse
}                                      from "../../core/modules/auth/domain/auth_admin_response"
import {
  LoginAuth
}                                      from "../../core/modules/auth/application/login_auth"

export class AuthService {
  constructor(
    private readonly jwt: JWTRepository,
    private readonly registerAuth: RegisterAuth,
    private readonly loginAuth: LoginAuth,
    private readonly removeAuth: RemoveAuth,
    private readonly updateAuth: UpdateAuth
  )
  {
  }

  async verifyToken( token : string ): Promise<Either<BaseException, any>> {
    const result = await this.jwt.verify(token)
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( result.right )
  }


  async login( dto: LoginRequest ): Promise<Either<BaseException[], AuthAdminResponse>> {
    const result = await this.loginAuth.execute(dto.email, dto.password)
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( result.right )
  }


  async register( dto: UserRequest,
    password: PasswordDTO,
    role: string,
    ): Promise<Either<BaseException[], AuthAdminResponse>> {
    const result = await this.registerAuth.execute( dto, password, role )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( result.right )
  }

  async remove( id: string ): Promise<Either<BaseException, boolean>> {
    const result = await this.removeAuth.execute( id )
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( true )
  }

  async update( dto: UserUpdateDTO, role: string ): Promise<Either<BaseException[], UserResponse>> {
    const result = await this.updateAuth.execute( dto,role)
    if ( isLeft( result ) ) {
      return left( result.left )
    }
    return right( UserMapper.toDTO( result.right ) )
  }
}
