import { getDocs } from 'firebase/firestore'
import formatPrice from '~/utils/priceStringFormatter'

export const state = () => ({
    items: {}
})

export const actions = {
    async fetchMenu ({ commit }, { $firestore }) {
        const menuItems = {}

        const menuDocsSnapshot = await getDocs($firestore.collection.menu)

        menuDocsSnapshot.forEach((doc) => {
            if (!doc.exists()) { return }

            const data = { ...doc.data(), id: doc.id }
            if (data.price) { data.priceString = formatPrice(data.price) }

            menuItems[data.itemId] = data
        })

        commit('UPDATE_MENU_ITEMS', menuItems)
    }
}

export const mutations = {
    UPDATE_MENU_ITEMS (state, payload) {
        state.items = payload
    }
}
