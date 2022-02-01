import { onAuthStateChanged } from 'firebase/auth'
import { getDoc } from 'firebase/firestore'
import getUserData from '~/utils/extractUserFromAuthUser'

const fetchUser = ({ $auth, $firestore }, cb) => {
    onAuthStateChanged($auth, (authUser) => {
        if (authUser) {
            getDoc($firestore.doc.user(authUser.uid)).then((userDoc) => {
                if (userDoc.exists()) {
                    const payload = { ...userDoc.data(), ...getUserData(authUser) }
                    cb(payload)
                }
            }).catch((e) => {
                console.error('Failed to Fetch User - Client:', e.message)
            })
        }
    })
}

export default ({ $auth, $firestore, store: { dispatch } }) => {
    fetchUser({ $auth, $firestore }, (payload) => {
        dispatch('user/updateUser', payload)
    })
}
