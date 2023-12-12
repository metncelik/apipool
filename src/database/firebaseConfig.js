import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth,  GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCO_cVG7sEeSv_bXkwMWU0jJ4636X6XPPk",
    authDomain: "apipool-43e34.firebaseapp.com",
    projectId: "apipool-43e34",
    storageBucket: "apipool-43e34.appspot.com",
    messagingSenderId: "700159491235",
    appId: "1:700159491235:web:f462dbb963e4fe58fb5316",
    measurementId: "G-PREP9V50QZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export {app,auth,googleProvider, githubProvider}

