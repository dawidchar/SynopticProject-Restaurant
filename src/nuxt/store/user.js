export const state = () => ({
    userData: {},
    validated: false
})

export const actions = {
    updateUser ({ commit }, payload) {
        if (payload.user) { commit('UPDATE_USER_DATA', payload.user) }
        if (payload.validated) { commit('UPDATE_USER_VALIDATION', payload.validated) }
    }
}

export const mutations = {
    UPDATE_USER_DATA (state, payload) {
        state.userData = payload
    },
    UPDATE_USER_VALIDATION (state, payload) {
        state.validated = payload
    }
}
