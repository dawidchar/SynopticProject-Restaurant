import tryParseJson from '~/utils/tryParseJson'
import { fireAuthHeader } from '~/config/firebase.config.js'
import checkIfUserIsAdmin from '~/utils/checkIfUserIsAdmin'
import fetchUserByUID from '~/services/fetchUserByUID.service'
import fetchUserBasketByUID from '~/services/fetchUserBasketByUID.service'

// The Firebase JS libary does not support passing an auth token on the server
// So for requests on the server, that require authentication
// need to be done through the firebase REST Api

const fetchUser = (context) => {
    const { $authUser, $authUser: { uid } = {} } = context
    return uid
        ? fetchUserByUID(context, uid).then(userData => ({ ...userData, ...$authUser })
        ).catch(e => console.error('(Server) Failed To Fetch User - Error:', e))
        : undefined
}

const fetchUserBasket = (context) => {
    const { $authUser: { uid } = {} } = context
    return fetchUserBasketByUID(context, uid).catch(e => console.error(`(Server) Failed To Fetch User's basket ${uid} - Error:`, e))
}

export default async (context, inject) => {
    const { store: { dispatch }, req } = context

    // Inject User Token in Logged In
    const fireAuthUser = tryParseJson(req?.headers?.[fireAuthHeader])
    inject('authUser', fireAuthUser)

    const user = await fetchUser(context)

    if (user) {
        dispatch('user/updateUser', user)

        if (checkIfUserIsAdmin(user)) { await dispatch('admin/enableAdminMode', context) }

        const userBasket = await fetchUserBasket(context)
        if (userBasket) { await dispatch('basket/hydrateBasketFromDB', userBasket) }

        dispatch('updateServerHydrationState', true)
    }

    await dispatch('menu/fetchMenu', context)
}
