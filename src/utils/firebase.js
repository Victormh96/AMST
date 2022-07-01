import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

//Firebase
const firebase = {
    apiKey: "AIzaSyD8q9lueJWy2VwW5pwNYnA7zhVSRC-aVSU",
    authDomain: "tecla96-9070b.firebaseapp.com",
    projectId: "tecla96-9070b",
    storageBucket: "tecla96-9070b.appspot.com",
    messagingSenderId: "431731585529",
    appId: "1:431731585529:web:ed29a39a56a8157c550d28"
}

const fbConfig = initializeApp(firebase)

const auth = getAuth(fbConfig)

export {
    auth
}