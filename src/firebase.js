// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGNNigIcgPSdPgL1a6l0bY6Zk9tJ9DS8w",
    authDomain: "game-leaderboard-8170c.firebaseapp.com",
    projectId: "game-leaderboard-8170c",
    storageBucket: "game-leaderboard-8170c.firebasestorage.app",
    messagingSenderId: "102058199339",
    appId: "1:102058199339:web:397a4db88c8e79386cdd6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
const auth = getAuth(app);

export { auth };
