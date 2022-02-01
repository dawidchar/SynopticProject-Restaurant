import { signOut } from 'firebase/auth'

export const state = () => ({
    userData: {}
})

export const actions = {
    updateUser ({ commit }, payload) {
        commit('UPDATE_USER_DATA', payload)
    },
    updateUserData ({ state, commit }, payload) {
        const mergedUserData = { ...state.userData, ...payload }
        commit('UPDATE_USER_DATA', mergedUserData)
    },
    async logout ({ commit }, { $auth, $router }) {
        if (!$auth) { throw new Error('VueX: User Logout - Missing $auth') }
        await signOut($auth)
        commit('UPDATE_USER_DATA', {})
        $router.push('/')
    }
}

export const mutations = {
    UPDATE_USER_DATA (state, payload) {
        state.userData = payload
    }
}
