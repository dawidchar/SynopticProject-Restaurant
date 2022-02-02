import { setDoc, serverTimestamp } from 'firebase/firestore'
import debounce from 'debounce'

const updateUserBasket = ({ store: nuxtStore, $store: vueStore, $firestore }, payload) => {
    // Because we call this service from a plugin, Nuxt passes store as as 'store'
    // While if we want to in the future call this from Vue, it passes store as '$store'
    // Both Refrence the same store
    const $store = nuxtStore || vueStore

    const userUID = $store.state.user?.userData?.uid

    if (!userUID) { throw new Error("User Not Signed In, Can't update user profile") }

    const DTO = { ...payload, timestamp: serverTimestamp() }

    return setDoc($firestore.doc.userBasket(userUID), DTO)
}

export default debounce(updateUserBasket, 2000)
