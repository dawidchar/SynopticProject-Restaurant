import Vue from 'vue'

export const state = () => ({
    items: {},
    firestoreHydrationTimestamp: ''
})

export const actions = {
    updateItem ({ commit, state, rootState }, payload) {
        const itemId = payload.itemId
        const quantity = (state.items[itemId]?.quantity || 0) + payload.delta

        if (quantity <= 0) { return commit('REMOVE_ITEM', itemId) }
        if (quantity > rootState.ordering.maxOfaSingleItem) { return false }

        commit('UPDATE_ITEM', { itemId, quantity })
    },
    removeItem ({ commit }, itemId) {
        commit('REMOVE_ITEM', itemId)
    },
    hydrateBasketFromDB ({ commit }, payload) {
        commit('LOCAL_UPDATE_BASKET_ITEMS', Object.values(payload.items))
        commit('UPDATE_FIRE_HYDRATION_TIMESTAMP', payload.timestamp)
    },
    clearBasketItems ({ commit }, localOnly) {
        commit(localOnly ? 'LOCAL_CLEAR_BASKET' : 'CLEAR_BASKET')
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
    },
    LOCAL_UPDATE_BASKET_ITEMS (state, payload) {
        payload.forEach((item) => {
            Vue.set(state.items, item.itemId, item)
        })
    },
    UPDATE_FIRE_HYDRATION_TIMESTAMP (state, payload) {
        state.firestoreHydrationTimestamp = payload
    },
    CLEAR_BASKET (state) {
        state.items = {}
    },
    LOCAL_CLEAR_BASKET (state) {
        state.items = {}
    }
}

export const getters = {
    basketCount (state) {
        return Object.values(state.items).reduce((prev, cur) => prev + cur.quantity, 0)
    }
}
