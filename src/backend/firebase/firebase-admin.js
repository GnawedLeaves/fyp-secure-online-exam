import { initializeApp, refreshToken } from 'firebase-admin/app';

//https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
//https://developers.google.com/identity/oauth2/web/guides/use-token-model

const myRefreshToken = '...'; // Get refresh token from OAuth2 flow

initializeApp({
    credential: refreshToken(myRefreshToken),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

const client = google.accounts.oauth2.initTokenClient({
    client_id: '192481901185-jo6n4m3vdmo7c3iln3dgni4egssplf2d.apps.googleusercontent.com',

    callback: (response) => {
        requestAccessToken()
    },
});