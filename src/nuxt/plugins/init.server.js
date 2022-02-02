import FireStoreParser from 'firestore-parser'
import tryParseJson from '~/utils/tryParseJson'
import { projectId } from '~/config/firebase.config.js'
import checkIfUserIsAdmin from '~/utils/checkIfUserIsAdmin'

const fetchUser = ({ req, $axios }) => {
    const firebaseUser = tryParseJson(req?.headers?.['firebase-user'])
    if (firebaseUser) {
        return $axios.$get(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${firebaseUser.uid}`, {
            headers: { Authorization: `Bearer ${firebaseUser.token}` }
        }).then((userData) => {
            return ({ ...FireStoreParser(userData.fields), ...firebaseUser })
        }).catch((e) => {
            console.error('Failed to Fetch User - Server:', e.message)
        })
    }
    return Promise.reject(new Error('User Not Signed In'))
}

export default async (context) => {
    const { store: { dispatch } } = context

    await fetchUser(context).then((user) => {
        dispatch('user/updateUser', user)
        checkIfUserIsAdmin(context, user)
    }).catch(() => {})
}
