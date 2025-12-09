<template>
  <div>
    <h1>Mi Jukebox con Spotify</h1>
    <div v-if="accessToken">
      <input type="text" v-model="searchQuery" placeholder="Busca tu canción..." class="search-input"/>
      <div v-for="track in searchResults" :key="track.id" class="track-item" @click="selectTrack(track)">
        <img :src="track.album.images[2]?.url"/>
        <div>
          <strong>{{ track.name }}</strong>
          <p>{{ track.artists.map( a => a.name ).join( ", " ) }}</p>
        </div>
      </div>
    </div>
    <button v-else @click="loginWithSpotify">
      🚀 Iniciar Sesión con Spotify
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

const accessToken = useCookie<string | null>( "spotify_access_token" )

const loginWithSpotify = async () => {
  const config = useRuntimeConfig().public

  const verifier  = generateRandomString( 128 )
  const challenge = await generateCodeChallenge( verifier )

  window.sessionStorage.setItem( "spotify_code_verifier", verifier )
  const authUrl = new URL( "https://accounts.spotify.com/authorize" )

  const params = new URLSearchParams( {
    response_type        : "code",
    client_id            : config.spotifyClientId,
    scope                : "user-read-private playlist-read-private",
    redirect_uri         : config.spotifyRedirectUri,
    code_challenge_method: "S256",
    code_challenge       : challenge
  } )

  authUrl.search       = new URLSearchParams( params ).toString()
  window.location.href = authUrl.toString()
}

const searchQuery   = ref( "" )
const searchResults = ref<any[]>( [] )

watch(searchQuery, async ( newQuery ) => {
  console.log( 'New search query:', newQuery )
  if ( newQuery.length < 3 || !accessToken.value ) {
    searchResults.value = []
    return
  }
  const response = await fetch(
      `https://api.spotify.com/v1/search?q=name:$${ encodeURIComponent( newQuery ) }&type=track&limit=10`, {
        headers: {
          "Authorization": `Bearer ${ accessToken.value }`
        }
      } )

  console.log( 'response',response )
  if ( !response.ok ) {
    console.error( "El token de Spotify pudo haber expirado." )
    accessToken.value = null
    return
  }

  const data          = await response.json()
  console.log( 'data',data )
  searchResults.value = data.tracks.items
})

const selectTrack = ( track: any ) => {
  const trackInfo = `${ track.name } - ${ track.artists.map( ( a: any ) => a.name ).join( ", " ) }`
  console.log( `Canción seleccionada para enviar a la cola: ${ trackInfo }` )
}


const generateRandomString = ( length: number ) => {
  let text       = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for ( let i = 0; i < length; i++ ) {
    text += possible.charAt( Math.floor( Math.random() * possible.length ) )
  }
  return text
}

const generateCodeChallenge = async ( verifier: string ) => {
  const data   = new TextEncoder().encode( verifier )
  const digest = await window.crypto.subtle.digest( "SHA-256", data )
  return btoa( String.fromCharCode.apply( null, [...new Uint8Array( digest )] ) )
      .replace( /\+/g, "-" )
      .replace( /\//g, "_" )
      .replace( /=+$/, "" )
}
</script>

<style>
.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.track-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 8px;
}

.track-item:hover {
  background-color: #f0f0f0;
}

.track-item img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>