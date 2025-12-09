import tailwindcss from "@tailwindcss/vite"
import Aura        from "@primeuix/themes/aura"

export default defineNuxtConfig( {
  compatibilityDate: "2025-07-15",
  devtools         : { enabled: true },
  modules          : [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    // "@prisma/nuxt",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-security",
    "@peterbud/nuxt-query",
    "@vueuse/nuxt"
  ],
  runtimeConfig    : {
    jwt: {
      key  : process.env.JWT_KEY,
    },
    public: {
      spotifyClientId: process.env.SPOTIFY_CLIENT,
      spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI
    }
  },
  css              : ["~/assets/css/main.css"],
  vite             : {
    plugins: [
      tailwindcss()
    ],
  },
  nuxtQuery        : {
    autoImports: ["useQuery", "useInfiniteQuery", "useMutation"]
  },
  supabase:
    {
      redirect: false
    },
  build: {
    transpile: ["fp-ts"]
  }
} )