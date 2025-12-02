import { isLeft }                    from "fp-ts/Either"
import {
  parseData
}                                    from "~~/core/modules/shared/application/parse_handlers"
import { signJwt }                   from "~~/server/utils/sign_jwt"
import {
  userRequestSchema
}                                    from "~~/core/modules/user/application/user_request"
import {
  passwordSchema
}                                    from "~~/core/modules/shared/domain/value_objects/password"
import { serverSupabaseServiceRole } from "#supabase/server"
import {
  SupabaseAdminUserData
}                                    from "~~/core/modules/auth/infrastructure/supabase_admin_user_data"
import {
  RegisterAuth
}                                    from "~~/core/modules/auth/application/register_auth"
import { SupabaseClient }            from "@supabase/supabase-js"

export default defineEventHandler( async ( event ) => {
  const body = await readBody( event )

  const dto = await parseData( userRequestSchema.extend( {
    password: passwordSchema
  } ), body )

  if ( isLeft( dto ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }

  const { password, ...request } = dto.right

  const supabaseClient: SupabaseClient = serverSupabaseServiceRole( event )
  const authData                       = new SupabaseAdminUserData( supabaseClient )
  const registerAuth                   = new RegisterAuth( authData )

  const result = await registerAuth.execute( request, password, "user" )

  if ( isLeft( result ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }
  setHeader( event, "ut", await signJwt( result.right ) )
  return {
    statusMessage: "OK",
    statusCode   : 200
  }
} )
