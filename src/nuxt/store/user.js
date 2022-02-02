import { signOut } from 'firebase/auth'

export const state = () => ({
    userData: {},
    loggedIn: false,
    admin: false
})

export const actions = {
    updateUser ({ commit }, payload) {
        commit('UPDATE_USER_DATA', payload)
    },
    updateUserData ({ state, commit }, payload) {
        const mergedUserData = { ...state.userData, ...payload }
        commit('UPDATE_USER_DATA', mergedUserData)
    },
    updateAdminState ({ commit }, payload) {
        commit('UPDATE_ADMIN_STATE', payload)
    },
    async logout ({ commit, dispatch }, { $auth, $router }) {
        if (!$auth) { throw new Error('VueX: User Logout - Missing $auth') }
        await signOut($auth)
        commit('UPDATE_USER_DATA', {})
        dispatch('basket/clearBasketItems', true, { root: true })
        $router.push('/')
    }
}

export const mutations = {
    UPDATE_USER_DATA (state, payload) {
        state.userData = payload
        state.loggedIn = !!payload.email
    },
    UPDATE_ADMIN_STATE (state, payload) {
        state.admin = payload
    }
}
