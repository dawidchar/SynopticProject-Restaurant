import appConfig from '~/config/app.config.js'
import formatPrice from '~/utils/priceStringFormatter'

export const state = () => ({
    ...appConfig,
    initServerHydrated: false
})

export const actions = {
    updateServerHydrationState ({ commit }, payload) {
        commit('UPDATE_INIT_SERVER_HYDRATED', payload)
    },
    enableAdminMode ({ commit, dispatch, state }, context) {
        const { $vuetify } = context
        if (!state.user?.admin) {
            dispatch('user/updateAdminState', true)
            dispatch('admin/fetchAdminData', context)
            if (state.admin_config.profileButton) { commit('ADD_PROFILE_BUTTON', state.admin_config.profileButton) }
        }

        if (process.client) {
            $vuetify.theme.themes.light = { ...$vuetify.theme.themes.light, ...state.admin_config.colorTheme.light }
            $vuetify.theme.themes.dark = { ...$vuetify.theme.themes.dark, ...state.admin_config.colorTheme.dark }
        }
    }
}

export const getters = {
    basketMenuItems (state) {
        return Object.values(state.basket.items)
            .map((basketItem) => {
                const menuItem = state.menu.items[basketItem.itemId]

                // TODO - Add logging
                if (!menuItem) { return null }

                const total = menuItem.price * basketItem.quantity
                const totalString = formatPrice(total)
                return { ...basketItem, ...menuItem, total, totalString }
            }).filter(item => item !== null)
    },
    basketTotal (_, getters) {
        return formatPrice(getters.basketMenuItems.reduce((prev, cur) => prev + cur.total, 0))
    }
}

export const mutations = {
    ADD_PROFILE_BUTTON (state, payload) {
        state.navbar?.profileButtons?.unshift(payload)
    },
    UPDATE_INIT_SERVER_HYDRATED (state, payload) {
        state.initServerHydrated = payload
    }
}
