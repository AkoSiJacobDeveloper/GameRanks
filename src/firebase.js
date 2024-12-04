// firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDrA49Mcu4hxyE1elAwRRQBlzbtZ581UXc',
  authDomain: 'game-leaderboard-634c6.firebaseapp.com',
  projectId: 'game-leaderboard-634c6',
  storageBucket: 'game-leaderboard-634c6.firebasestorage.app',
  messagingSenderId: '84329848165',
  appId: '1:84329848165:web:bd3098d7e6dc0b4207158c',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
