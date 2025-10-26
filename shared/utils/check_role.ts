import { matchRole, RoleLevel } from "../../modules/shared/utils/role_level"
import { authService }          from "../dependencies/dependencies"
import { isLeft }               from "fp-ts/Either"

type RoleResponse = {
                      message: string
                      code: number
                      type: "error"
                    } | {
                      type: "success"
                      data: any
                    }

// @ts-ignore
export const checkRole = async ( request, response,
  minRole: RoleLevel ): Promise<RoleResponse> => {

  const token = request.headers.authorization
  if ( !token && !token.startsWith( "Bearer " ) ) {
    return {
      message: "Unauthorized",
      code   : 401,
      type   : "error"
    }
  }

  const split = token.split( " " )[1].trim()

  const decodedTokenResult = await authService.verifyToken( split )
  if ( isLeft( decodedTokenResult ) ) {
    return {
      message: "Unauthorized",
      code   : 401,
      type   : "error"
    }
  }
  const decodedToken = decodedTokenResult.right
  const userRole = decodedToken.user_metadata.permission &&
  decodedToken.user_metadata.permission !== "incomplete"
    ? decodedToken.user_metadata.permission
    : decodedToken.role === "authenticated" ? "user" : "public"
  const isRole   = matchRole( userRole )
  if ( !isRole || isRole < minRole )
  {
    return {
      message: "Forbidden",
      code   : 403,
      type   : "error"
    }
  }
  return {
    type: "success",
    data: decodedToken
  }
}