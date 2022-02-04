import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, setPersistence, indexedDBLocalPersistence } from 'firebase/auth'
import firebaseConfig from '~/config/firebase.config.js'

// ---- Initialize Firebase App ---- //
const apps = getApps()
let firebaseApp

if (!apps.length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = apps[0]
}

// ---- Initialize Services ---- //

const db = getFirestore(firebaseApp, {})
const auth = getAuth(firebaseApp, {})

// ---- Configure Services ---- //

// Set persistence to session.
setPersistence(auth, indexedDBLocalPersistence)

// Inject services into Nuxt
export default (_, inject) => {
    // Main Services
    inject('firebaseApp', firebaseApp)
    inject('db', db)
    inject('auth', auth)
}
