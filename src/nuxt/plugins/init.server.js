import FireStoreParser from 'firestore-parser'
import tryParseJson from '~/utils/tryParseJson'
import { projectId } from '~/config/firebase.config.js'
import checkIfUserIsAdmin from '~/utils/checkIfUserIsAdmin'

// The Firebase JS libary does not support passing an auth token on the server
// So for requests on the server, that require authentication
// need to be done through the firebase REST Api

const fetchUser = ({ req, $axios }) => {
    const firebaseUser = tryParseJson(req?.headers?.['firebase-user'])
    if (firebaseUser) {
        return $axios.$get(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${firebaseUser.uid}`, {
            headers: { Authorization: `Bearer ${firebaseUser.token}` }
        }).then(userData => ({ ...FireStoreParser(userData.fields), ...firebaseUser })
        ).catch(e => console.error(`Failed to Fetch User (${firebaseUser.uid}) - Server:`, e.message))
    }
    return Promise.reject(new Error('User Not Signed In'))
}

const fetchUserBasket = ({ $axios }, user) => {
    return $axios.$get(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/basket/${user.uid}`, {
        headers: { Authorization: `Bearer ${user.token}` }
    }).then(userBasket => FireStoreParser(userBasket.fields)
    ).catch(e => console.info(`Failed to Fetch User's Basket (${user.uid}) - Server:`, e.message))
}

export default async (context) => {
    const { store: { dispatch } } = context

    const user = await fetchUser(context).catch(() => { })

    if (user) {
        dispatch('user/updateUser', user)
        if (checkIfUserIsAdmin(user)) { await dispatch('enableAdminMode', context) }

        const userBasket = await fetchUserBasket(context, user)
        if (userBasket) { await dispatch('basket/hydrateBasketFromDB', userBasket) }
    }

    await dispatch('menu/fetchMenu', context)

    dispatch('updateServerHydrationState', true)
}
