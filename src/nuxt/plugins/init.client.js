import { onAuthStateChanged } from 'firebase/auth'
import { getDoc } from 'firebase/firestore'
import getUserData from '~/utils/extractUserFromAuthUser'
import checkIfUserIsAdmin from '~/utils/checkIfUserIsAdmin'

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

export default (context) => {
    const { store: { dispatch } } = context
    fetchUser(context, (user) => {
        dispatch('user/updateUser', user)
        checkIfUserIsAdmin(context, user)
    })
}
