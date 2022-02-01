import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc } from 'firebase/firestore'
import getUserData from '~/utils/extractUserFromAuthUser'

export default ({ $auth, $firestore, $store: { dispatch } }, data) => {
    return createUserWithEmailAndPassword($auth, data.email, data.password).then((cred) => {
        const dataPayload = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber
        }
        return setDoc($firestore.doc.user(cred.user.uid), dataPayload).then(() => {
            dispatch('user/updateUserData', { ...dataPayload, ...getUserData(cred.user) })
        })
    })
}
