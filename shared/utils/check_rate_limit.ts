// import { Redis }     from "@upstash/redis"
// import { Ratelimit } from "@upstash/ratelimit"
//
// const upstashRedisRestUrl   = process.env.UPSTASH_REDIS_REST_URL as string
// const upstashRedisRestToken = process.env.UPSTASH_REDIS_REST_TOKEN as string
//
// const redis = new Redis( {
//   url  : upstashRedisRestUrl,
//   token: upstashRedisRestToken
// } )
//
// const ratelimit = new Ratelimit( {
//   redis         : redis,
//   limiter       : Ratelimit.slidingWindow( 50, "60s" ),
//   ephemeralCache: new Map(),
//   enableProtection: true,
//   analytics: true,
// } )
//
// type RateResponse = {
//   headers?: Headers,
//   success: boolean,
//   code: number,
// }
//
// // @ts-ignore
// export const checkRateLimit = async ( request, response, identifier: string,
//   rate: number ): Promise<RateResponse> => {
//   const ip = request.ip ||
//     request.headers['x-forwarded-for']?.split(',')[0].trim() ||
//     request.connection.remoteAddress ||
//     request.socket.remoteAddress ||
//     'Unknown';
//
//   if ( !ip ) {
//     return {
//       success: false,
//       code   : 500
//     }
//   }
//
//   const { success, limit, remaining, reset } = await ratelimit.limit(
//     identifier, {
//       rate: rate,
//       ip  : ip
//     } )
//
//   if ( !success ) {
//     const headers : Headers = new Headers()
//     headers.set( "X-RateLimit-Limit", limit.toString() )
//     headers.set( "X-RateLimit-Remaining", remaining.toString() )
//     headers.set( "X-RateLimit-Reset", reset.toString() )
//     return {
//       headers,
//       success: false,
//       code   : 429
//     }
//
//   }
//   return {
//     success: true,
//     code   : 200
//   }
// }