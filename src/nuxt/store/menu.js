import { getDocs } from 'firebase/firestore'
import formatPrice from '~/utils/priceStringFormatter'

export const state = () => ({
    items: {},
    cached: {}
})

export const actions = {
    async fetchMenu ({ commit, state }, { $firestore }) {
        if (state.cached.menu) { return }
        const menuItems = {}

        const menuDocsSnapshot = await getDocs($firestore.collection.menu)

        menuDocsSnapshot.forEach((doc) => {
            if (!doc.exists()) { return }

            const data = { ...doc.data(), id: doc.id }
            if (data.price) { data.priceString = formatPrice(data.price) }

            menuItems[data.itemId] = data
        })

        commit('UPDATE_MENU_ITEMS', menuItems)
        commit('UPDATE_CACHE_STATE', { key: 'menu', value: true })
    }
}

export const mutations = {
    UPDATE_MENU_ITEMS (state, payload) {
        state.items = payload
    },
    UPDATE_CACHE_STATE (state, payload) {
        state.cached[payload.key] = payload.value
    }
}
