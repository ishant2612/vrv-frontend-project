import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB7ljoU2Oki-rAi6tsbmDocMjJrSbiWi8g",
    authDomain: "admin-panel-vrv.firebaseapp.com",
    projectId: "admin-panel-vrv",
    storageBucket: "admin-panel-vrv.firebasestorage.app",
    messagingSenderId: "1006947467628",
    appId: "1:1006947467628:web:670ad0dbe9b9365405f349"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }; 