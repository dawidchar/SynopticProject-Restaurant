import { updateDoc } from 'firebase/firestore'

export default ({ $store, $firestore, $store: { dispatch } }, payload) => {
    const userUID = $store.state.user?.userData?.uid

    if (!userUID) { return Promise.reject(new Error("User Not Signed In, Can't update user details")) }

    return updateDoc($firestore.doc.user(userUID), payload).then(() => {
        dispatch('user/updateUserData', payload)
    })
}
