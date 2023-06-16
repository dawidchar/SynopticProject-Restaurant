import appConfig from '~/config/app.config.js'
import formatPrice from '~/utils/priceStringFormatter'

export const state = () => ({
    ...appConfig,
    initServerHydrated: false
})

export const actions = {
    updateServerHydrationState ({ commit }, payload) {
        commit('UPDATE_INIT_SERVER_HYDRATED', payload)
    }
}

export const getters = {
    basketMenuItems (state) {
        return Object.values(state.basket.items)
            .map((basketItem) => {
                const menuItem = state.menu.items[basketItem.itemId]

                // TODO - Add logging
                if (!menuItem) { return null }

                const total = menuItem.stock ? menuItem.price * basketItem.quantity : 0
                const totalString = menuItem.stock ? formatPrice(total) : 'N/A'
                return { ...basketItem, ...menuItem, total, totalString }
            }).filter(item => item !== null)
    },
    basketTotal (_, getters) {
        return formatPrice(getters.basketMenuItems.reduce((prev, cur) => prev + cur.total, 0))
    }
}

export const mutations = {
    ADD_PROFILE_BUTTON (state, payload) {
        state.navbar.profileButtons.unshift(payload)
    },
    REMOVE_PROFILE_BUTTON (state, id) {
        state.navbar.profileButtons = state.navbar.profileButtons.filter(item => item.id !== id)
    },
    UPDATE_INIT_SERVER_HYDRATED (state, payload) {
        state.initServerHydrated = payload
    }
}
