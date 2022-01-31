import { getDocs } from 'firebase/firestore'

export const state = () => ({
    items: {}
})

export const actions = {
    async fetchMenu ({ commit }, { $firestore }) {
        const firecb = (snapshot) => {
            const menuItems = {}

            snapshot.forEach((doc) => {
                const docData = doc.data()
                if (!docData.slug) { return }
                menuItems[docData.slug] = { ...docData, id: doc.id }
            })

            commit('UPDATE_MENU_ITEMS', menuItems)
        }

        await getDocs($firestore.collection.menu).then(firecb)
    }
}

export const mutations = {
    UPDATE_MENU_ITEMS (state, payload) {
        state.items = payload
    }
}
