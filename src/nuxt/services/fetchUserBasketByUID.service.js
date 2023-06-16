import { getDoc } from 'firebase/firestore'
import fetchFromFirestoreREST from '~/services/fetchFromFirestoreRest'

export default (context, userUID) => {
    const { $firestore } = context

    if (userUID) {
        if (process.client) {
            return getDoc($firestore.doc.userBasket(userUID)).then(docSnap => docSnap.exists() ? docSnap.data() : undefined)
        } else {
            return fetchFromFirestoreREST(context, `basket/${userUID}`)
        }
    }

    return Promise.reject(new Error("Failed to fetch user's basket - userUID Missing"))
}
