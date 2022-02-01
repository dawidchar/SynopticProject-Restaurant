// import { signOut } from 'firebase/auth'

export const state = () => ({
    userData: {}
})

export const actions = {
    updateUser ({ commit }, payload) {
        commit('UPDATE_USER_DATA', payload)
    },
    logout ({ commit }, { $auth }) {
        console.log('SIGN OUT')
        if (!$auth) { throw new Error('VueX: User Logout - Missing $auth') }
        // await signOut()
        commit('UPDATE_USER_DATA', {})
    }
}

export const mutations = {
    UPDATE_USER_DATA (state, payload) {
        state.userData = payload
    }
}
