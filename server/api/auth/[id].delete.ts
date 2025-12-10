import { isLeft }                    from "fp-ts/Either"
import { z }                         from "zod"
import {
  RemoveAuth
}                                    from "@/core/modules/auth/application/remove_auth"
import { serverSupabaseServiceRole } from "#supabase/server"
import {
  SupabaseAdminUserData
}                                    from "@/core/modules/auth/infrastructure/supabase_admin_user_data"
import type { SupabaseClient }       from "@supabase/supabase-js"
import {
  parseData
}                                    from "@/core/modules/shared/application/parse_handlers"

export default defineEventHandler( async ( event ) => {
  const idParam = getRouterParam(event, 'id')
  const param     = await parseData( z.object( {
    id: z.string()
  } ), {
    id: idParam
  } )
  if ( isLeft( param ) ) {
    throw createError( {
      statusCode   : 400,
      statusMessage: "Bad Request"
    } )
  }
  const supabaseClient: SupabaseClient = serverSupabaseServiceRole( event )
  const authData                 = new SupabaseAdminUserData( supabaseClient )
  const removeAuth             = new RemoveAuth( authData )
  const result = await removeAuth.execute( param.right.id )
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
