import { collection, doc } from 'firebase/firestore'

const firestoreCollectionRefs = ({ $db }) => {
    return {
        menu: collection($db, 'menu')
    }
}

const firestoreUserRefs = ({ $db }) => {
    return {
        user: uid => doc($db, 'users', uid)
    }
}

export default ({ $db }, inject) => {
    // Inject Firestore Collection & Document Refs
    inject('firestore', {
        collection: firestoreCollectionRefs({ $db }),
        doc: firestoreUserRefs({ $db })
    })
}
