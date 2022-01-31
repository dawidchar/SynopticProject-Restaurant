import Vue from 'vue'

export const state = () => ({
    items: {
        burger: { itemId: 'burger', quantity: 2 }
    }
})

export const actions = {
    updateItem ({ commit, state }, payload) {
        const itemId = payload.itemId
        const quantity = (state.items[itemId]?.quantity || 0) + payload.delta

        if (quantity <= 0) { return commit('REMOVE_ITEM', itemId) }

        commit('UPDATE_ITEM', { itemId, quantity })
    }
}
export const mutations = {
    UPDATE_ITEM (state, payload) {
        if (state.items[payload.itemId]) {
            state.items[payload.itemId] = payload
        } else {
            Vue.set(state.items, payload.itemId, payload)
        }
    },
    REMOVE_ITEM (state, payload) {
        Vue.delete(state.items, payload)
    }
}

export const getters = {
    basketCount (state) {
        return Object.values(state.items).reduce((prev, cur) => prev + cur.quantity, 0)
    }
}
