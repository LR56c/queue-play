<template>
  <div>
    <p>Autenticando, por favor espera...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const config = useRuntimeConfig().public;

  const code = route.query.code as string;
  const codeVerifier = window.sessionStorage.getItem('spotify_code_verifier');

  if (!code || !codeVerifier) {
    console.error("Error: El código de autorización o el verificador no se encontraron.");
    router.push('/');
    return;
  }

  try {
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.spotifyClientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.spotifyRedirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch(url, payload);

    if (!body.ok) {
      throw new Error(`Error de Spotify: ${body.statusText}`);
    }

    const response = await body.json();
    const accessToken = useCookie('spotify_access_token', {
      maxAge: response.expires_in // La cookie expirará al mismo tiempo que el token
    });
    accessToken.value = response.access_token;

  } catch (error) {
    console.error("Ocurrió un error al obtener el token de Spotify:", error);
  } finally {
    window.sessionStorage.removeItem('spotify_code_verifier');
    router.push('/');
  }
});
</script>