import { getDocs, onSnapshot } from 'firebase/firestore'
import extractMenuItemsFromSnapshot from '~/services/extractMenuItemsFromSnapshot'

export const state = () => ({
    items: {},
    timestamp: {}
})

export const actions = {
    async fetchMenu ({ commit, dispatch }, { $firestore }) {
        const menuDocsSnapshot = await getDocs($firestore.collection.menu)

        const menuItems = extractMenuItemsFromSnapshot(menuDocsSnapshot)

        commit('UPDATE_MENU_ITEMS', menuItems)
        if (process.client) { dispatch('updateLowStockItemsInBasket') }
    },
    registerSnapshotListner ({ commit, dispatch }, { $firestore }) {
        onSnapshot($firestore.collection.menu, (snapshot) => {
            const menuItems = extractMenuItemsFromSnapshot(snapshot)
            commit('UPDATE_MENU_ITEMS', menuItems)
            dispatch('updateLowStockItemsInBasket')
        })
    },
    updateLowStockItemsInBasket ({ dispatch, state, rootState }) {
        Object.values(state.items).forEach((item) => {
            if (item.stock && item.stock < rootState.basket.items?.[item.itemId]?.quantity) {
                dispatch('basket/updateItem', { itemId: item.itemId, quantity: item.stock }, { root: true })
            }
        })
    }
}

export const mutations = {
    UPDATE_MENU_ITEMS (state, payload) {
        state.items = payload
    }
}
