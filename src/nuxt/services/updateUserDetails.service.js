import { updateDoc } from 'firebase/firestore'

export default ({ $store, $firestore }, data) => {
    const userUID = $store.state.user.uid

    // TODO - Update VueX Store with new data
    return updateDoc($firestore.doc.user(userUID), data)
}
