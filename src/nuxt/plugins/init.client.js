import { onAuthStateChanged } from 'firebase/auth'
import { getDoc } from 'firebase/firestore'
import getUserData from '~/utils/extractUserFromAuthUser'
import checkIfUserIsAdmin from '~/utils/checkIfUserIsAdmin'

const fetchUser = ({ $auth, $firestore, store: { state, dispatch } }, cb) => {
    onAuthStateChanged($auth, (authUser) => {
        // Avoids Fetching User Data on the client when it's already provided by the server through SSR
        // We need to make sure initServerHydrated is handled by refrence and not by value
        if (state.initServerHydrated) {
            dispatch('updateServerHydrationState', false)
            return cb(undefined)
        }

        let DTO
        if (authUser) {
            getDoc($firestore.doc.user(authUser.uid)
            ).then((userDoc) => {
                if (userDoc.exists()) { DTO = { ...userDoc.data(), ...getUserData(authUser) } }
            }).catch(e => console.error('Failed to Fetch User - Client:', e.message)
            ).finally(() => cb(DTO))
        }
    })
}

const fetchUserBasket = ({ $firestore }, user) =>
    getDoc($firestore.doc.userBasket(user.uid))
        .then(docSnap => docSnap.data())
        .catch(e => console.error("Failed to Fetch User's Basket - Client:", e.message))

export default (context) => {
    const { store: { dispatch, state } } = context

    const SSRHydrated = state.initServerHydrated

    fetchUser(context, async (user) => {
        if (checkIfUserIsAdmin(user || state.user.userData)) { await dispatch('enableAdminMode', context) }

        if (user) {
            await dispatch('user/updateUser', user)

            await fetchUserBasket(context, user).then(payload => payload ? dispatch('basket/hydrateBasketFromDB', payload) : false)
        }
    })

    if (!SSRHydrated) { dispatch('menu/fetchMenu', context) }
}
