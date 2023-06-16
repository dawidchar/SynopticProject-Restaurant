import { getPerformance } from 'firebase/performance'
import { onAuthStateChanged } from 'firebase/auth'
import getUserData from '~/utils/extractUserFromAuthUser'
import checkIfUserIsAdmin from '~/utils/checkIfUserIsAdmin'
import fetchUserByUID from '~/services/fetchUserByUID.service'
import fetchUserBasketByUID from '~/services/fetchUserBasketByUID.service'

const fetchUser = (context, cb) => {
    const { $auth, store: { state, dispatch } } = context
    onAuthStateChanged($auth, (authUser) => {
        // Avoids Fetching User Data on the client when it's already provided by the server through SSR
        // We need to make sure initServerHydrated is handled by refrence and not by value
        if (state.initServerHydrated === true) {
            dispatch('updateServerHydrationState', null)
            return cb(undefined)
        }

        let DTO
        if (authUser) {
            fetchUserByUID(context, authUser.uid
            ).then((userDoc) => {
                if (userDoc) { DTO = { ...userDoc, ...getUserData(authUser) } }
            }).catch(e => console.error('Failed to Fetch User - Client:', e.message)
            ).finally(() => cb(DTO))
        }
    })
}

const fetchUserBasket = (context, uid) => {
    return fetchUserBasketByUID(context, uid).catch(e => console.error(`(Client) Failed To Fetch User's basket ${uid} - Error:`, e))
}

export default (context, inject) => {
    const { store: { dispatch, state }, $firebaseApp } = context

    const perf = getPerformance($firebaseApp)
    inject('perf', perf)

    const SSRHydrated = state.initServerHydrated

    fetchUser(context, async (user) => {
        if (checkIfUserIsAdmin(user || state.user.userData)) { await dispatch('admin/enableAdminMode', context) }

        if (user) {
            await dispatch('user/updateUser', user)

            await fetchUserBasket(context, user.uid).then(payload => payload && dispatch('basket/hydrateBasketFromDB', payload))
        }
    })

    if (!SSRHydrated) { dispatch('menu/fetchMenu', context) }

    dispatch('menu/registerSnapshotListner', context)
}
