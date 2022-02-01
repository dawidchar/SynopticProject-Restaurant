import appConfig from '~/config/app.config.js'
import formatPrice from '~/utils/priceStringFormatter'

export const state = () => ({
    ...appConfig

})

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
export const actions = {}

export const mutations = {
    ADD_MENU_BUTTONS (state, payload) {
        state.navbar?.menuButtons?.push(payload)
    }
}
