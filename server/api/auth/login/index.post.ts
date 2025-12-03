import { isLeft }                    from "fp-ts/Either"
import {
  parseData
}                                    from "~~/core/modules/shared/application/parse_handlers"
import {
  loginRequestSchema
}                                    from "~~/core/modules/auth/domain/login_request"
import { signJwt }                   from "~~/server/utils/sign_jwt"
import { serverSupabaseServiceRole } from "#supabase/server"
import {
  SupabaseAdminUserData
}                                    from "~~/core/modules/auth/infrastructure/supabase_admin_user_data"
import {
  LoginAuth
}                                    from "~~/core/modules/auth/application/login_auth"
import { SupabaseClient }            from "@supabase/supabase-js"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )

  const dto = await parseData( loginRequestSchema, body )

  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const supabaseClient: SupabaseClient = serverSupabaseServiceRole( event )
  const authData                       = new SupabaseAdminUserData(
    supabaseClient )
  const loginAuth                      = new LoginAuth( authData )

  const result = await loginAuth.execute( dto.right )

  if ( isLeft( result ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  setHeader( event, "ut", result.right.token )
  return {
    statusMessage: "OK",
    statusCode   : 200
  }
} )
