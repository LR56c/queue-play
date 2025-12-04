import { isLeft }                    from "fp-ts/Either"
import {
  parseData
}                                    from "~~/core/modules/shared/application/parse_handlers"
import {
  userUpdateSchema
}                                    from "~~/core/modules/user/application/user_update_dto"
import { jwtData }                   from "~~/server/dependencies/dependencies"
import {
  RoleLevel
}                                    from "~~/core/modules/shared/utils/role_level"
import { serverSupabaseServiceRole } from "#supabase/server"
import {
  SupabaseAdminUserData
}                                    from "~~/core/modules/auth/infrastructure/supabase_admin_user_data"
import {
  UpdateAuth
}                                    from "~~/core/modules/auth/application/update_auth"
import type { SupabaseClient }       from "@supabase/supabase-js"

export default defineEventHandler( async ( event ) => {
  const headers = getRequestHeaders( event )

  const check = await checkRole( jwtData, headers, RoleLevel.ADMIN )

  if ( check.type === "error" ) {
    throw createError( {
      statusCode   : 403,
      statusMessage: "Forbidden"
    } )
  }

  const body = await readBody( event )
  const dto  = await parseData( userUpdateSchema, body )
  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const supabaseClient: SupabaseClient = serverSupabaseServiceRole( event )
  const authData                       = new SupabaseAdminUserData(
    supabaseClient )
  const updateAuth                     = new UpdateAuth( authData )

  const result = await updateAuth.execute( dto.right )
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
