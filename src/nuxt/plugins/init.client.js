import { onAuthStateChanged } from 'firebase/auth'
import { getDoc } from 'firebase/firestore'
import getUserData from '~/utils/extractUserFromAuthUser'

const fetchUser = ({ $auth, $db, $firestore }, cb) => {
    onAuthStateChanged($auth, (authUser) => {
        if (authUser) {
            getDoc($firestore.doc.user(authUser.uid)).then((userDoc) => {
                if (userDoc.exists()) {
                    const payload = { user: { ...getUserData(authUser), ...userDoc.data() }, validated: true }
                    cb(payload)
                }
            }).catch((e) => {
                console.error('Failed to Fetch User - Client:', e.message)
            })
        }
    })
}

export default ({ $auth, $db, $firestore, store: { dispatch } }) => {
    fetchUser({ $auth, $db, $firestore }, (payload) => {
        dispatch('user/updateUser', payload)
    })
}
