import tailwindcss from "@tailwindcss/vite"
import Aura        from "@primeuix/themes/aura"

export default defineNuxtConfig( {
  compatibilityDate: "2025-07-15",
  devtools         : { enabled: true },
  modules          : [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@prisma/nuxt",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "@primevue/nuxt-module",
    "nuxt-security",
    "@peterbud/nuxt-query",
    "@vueuse/nuxt"
  ],
  runtimeConfig    : {
    public: {
      spotifyClientId: process.env.SPOTIFY_CLIENT,
      spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI
    }
  },
  css              : ["~/assets/css/main.css", "primeicons/primeicons.css"],
  vite             : {
    plugins: [
      tailwindcss()
    ]
  },
  nuxtQuery        : {
    autoImports: ["useQuery", "useInfiniteQuery", "useMutation"]
  },

  supabase:
    {
      redirect: false
    },

  primevue: {
    options: {
      theme: {
        preset : Aura,
        options:
          {
            darkModeSelector: "[theme=\"dark\"]"
          }
      }
    }
  }
  ,

  build: {
    transpile: ["fp-ts"]
  }
} )