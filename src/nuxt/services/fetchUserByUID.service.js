import { getDoc } from 'firebase/firestore'
import fetchFromFirestoreREST from '~/services/fetchFromFirestoreRest'

export default (context, userUID) => {
    const { $firestore } = context

    if (userUID) {
        if (process.client) {
            return getDoc($firestore.doc.user(userUID)).then(docSnap => docSnap.exists() ? docSnap.data() : undefined)
        } else {
            return fetchFromFirestoreREST(context, `users/${userUID}`)
        }
    }

    return Promise.reject(new Error('Failed to fetch user - userUID Missing'))
}
