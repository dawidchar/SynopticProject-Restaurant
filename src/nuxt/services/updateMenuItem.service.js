import { setDoc, addDoc } from 'firebase/firestore'

export default ({ $firestore, $store }, payload) => {
    // Check if payload has a menu doc id or if we need to create a new one
    if (payload.id) {
        return setDoc($firestore.doc.menuItem(payload.id), payload)
    } else {
        // TODO - Verify Server Side
        if ($store.state?.menu?.items?.[payload.itemId] !== undefined) { return Promise.reject(new Error('Item Id Already Exists')) }
        return addDoc($firestore.collection.menu, payload)
    }
}
