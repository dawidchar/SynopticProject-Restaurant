import { updateDoc } from 'firebase/firestore'

export default ({ $store, $firestore, $store: { dispatch } }, payload) => {
    const userUID = $store.state.user?.userData?.uid

    if (!userUID) { throw new Error("User Not Signed In, Can't update user profile") }

    return updateDoc($firestore.doc.user(userUID), payload).then(() => {
        dispatch('user/updateUserData', payload)
    })
}
