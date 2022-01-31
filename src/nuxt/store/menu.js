import { getDocs } from 'firebase/firestore'
import formatPrice from '~/utils/priceStringFormatter'

export const state = () => ({
    items: {},
    cached: {}
})

export const actions = {
    async fetchMenu ({ commit, state }, { $firestore }) {
        if (state.cached.menu) { return }

        const cb = (snapshot) => {
            const menuItems = {}

            snapshot.forEach((doc) => {
                const docData = doc.data()
                if (!docData.slug) { return }
                const data = { ...docData, id: doc.id }
                if (data.price) { data.priceString = formatPrice(data.price) }

                // TODO - Change slug to itemId
                menuItems[docData.slug] = data
            })

            commit('UPDATE_MENU_ITEMS', menuItems)
            commit('UPDATE_CACHE_STATE', { key: 'menu', value: true })
        }

        await getDocs($firestore.collection.menu).then(cb)
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
