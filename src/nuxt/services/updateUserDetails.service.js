import { updateDoc } from 'firebase/firestore'

export default ({ $store, $firestore }, data) => {
    const userUID = $store.state.user?.userdata?.uid

    if (!userUID) { throw new Error("User Not Signed In, Can't update user profile") }

    // TODO - Update VueX Store with new data
    return updateDoc($firestore.doc.user(userUID), data)
}
