import Vue from 'vue'

export const state = () => ({
    items: {},
    firestoreHydrationTimestamp: ''
})

export const actions = {
    updateItem ({ commit, state, rootState }, payload) {
        const itemId = payload.itemId
        const menuItem = rootState.menu.items?.[itemId]

        // Cancel If Item Does Not exist
        // TODO - Add Logging
        if (!menuItem) { return }

        const quantity = (payload.quantity || payload.quantity === 0)
            ? payload.quantity
            : (state.items[itemId]?.quantity || 0) + (payload.delta || 0)
        const name = menuItem.name

        if (quantity <= 0) { return commit('REMOVE_ITEM', itemId) }
        if (quantity > rootState.ordering.maxOfaSingleItem ||
            quantity > menuItem.stock) { return false }

        commit('UPDATE_ITEM', { itemId, quantity, name })
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
    // TODO - Create action to remove deleted Items from User basket in DB when menu gets a snapshot update
    // Below it just gets filtered out instead of being removed
    basketCount (state, _, rootState) {
        return Object.values(state.items).reduce((prev, cur) => (rootState.menu.items[cur.itemId] ? prev + cur.quantity : prev), 0)
    }
}
