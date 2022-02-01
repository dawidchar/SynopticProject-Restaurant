import FireStoreParser from 'firestore-parser'
import tryParseJson from '~/utils/tryParseJson'
import { projectId } from '~/config/firebase.config.js'

const fetchUser = ({ req, $axios }) => {
    const firebaseUser = tryParseJson(req?.headers?.['firebase-user'])
    if (firebaseUser) {
        return $axios.$get(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${firebaseUser.uid}`, {
            headers: { Authorization: `Bearer ${firebaseUser.token}` }
        }).then((userData) => {
            return ({ user: { ...FireStoreParser(userData.fields), ...firebaseUser }, validated: true })
        }).catch((e) => {
            console.error('Failed to Fetch User - Server:', e.message)
        })
    }
}

export default async ({ req, $axios, store: { dispatch } }) => {
    await fetchUser({ req, $axios }).then((user) => {
        dispatch('user/updateUser', user)
    })
}
