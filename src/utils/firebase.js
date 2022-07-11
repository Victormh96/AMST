import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

//Firebase
const firebase = {
    apiKey: "AIzaSyAYv3sRY1Jq0PfQxW47XWApevKHP6d-Du8",
    authDomain: "tecla-528dd.firebaseapp.com",
    projectId: "tecla-528dd",
    storageBucket: "tecla-528dd.appspot.com",
    messagingSenderId: "698447747389",
    appId: "1:698447747389:web:f950fa7a82b234f77b0d54"
}

const fbConfig = initializeApp(firebase)

const auth = getAuth(fbConfig.auth())

export {
    auth
}