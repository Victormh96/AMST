
import { getAuth, signOut, signInWithEmailAndPassword, updatePassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from 'firebase/app';

//Firebase
const firebase = {
    apiKey: "AIzaSyD8q9lueJWy2VwW5pwNYnA7zhVSRC-aVSU",
    authDomain: "tecla96-9070b.firebaseapp.com",
    projectId: "tecla96-9070b",
    storageBucket: "tecla96-9070b.appspot.com",
    messagingSenderId: "431731585529",
    appId: "1:431731585529:web:ed29a39a56a8157c550d28"
}

const fb = initializeApp(firebase)

const firebaseAuth = getAuth(fb);

const createUserGoogle = async (user) => {
    let response = null;
    const { email, password } = user;
    await createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
        response = userCredential;
    }).catch((error) => {
        response = {
            error: true,
            message: error.code
        };
    });
    return response;
}

const loginGoogle = async (user) => {
    let response = null;
    const { email, password } = user;
    await signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
        response = userCredential;
    }).catch((error) => {
        response = {
            error: true,
            message: error.code
        };
    });
    return response;
}

const singOutGoogle = async () => {
    try {
        await signOut(firebaseAuth).then(
            (res) => {
                console.log(res)
            }
        );
    } catch (error) {
        console.log(error);
    }
}

onAuthStateChanged(firebaseAuth, (token) => {
    if (token) {
        console.log(token)
        return token
    } else {
        console.log("no esta logueado")
        return false
    }
});

const resetPasswordGoogle = async (user) => {
    let response = null;
    const { newPassword } = user;
    const res = await loginGoogle(user)
    const userFirebase = firebaseAuth.currentUser;
    if (res?.message === 'auth/wrong-password' || res?.message === 'auth/too-many-requests') {
        return res
    }
    await updatePassword(userFirebase, newPassword).then(() => {
        response = 'Se ha cambiado la contraseña con exito';
    }).catch((error) => {
        response = {
            error: true,
            message: error.code
        };
    });
    return response;
}

export {
    createUserGoogle,
    loginGoogle,
    resetPasswordGoogle,
    singOutGoogle,
    onAuthStateChanged,

}