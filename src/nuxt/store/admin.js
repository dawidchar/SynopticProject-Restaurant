import formatPrice from '~/utils/priceStringFormatter'
import formatFirebaseTimestampAsString from '~/utils/formatFirebaseTimestampAsString'
import getFirestoreTimestampFromToday from '~/utils/getFirestoreTimestampFromToday'
import fetchUserByUID from '~/services/fetchUserByUID.service'
import fetchOrders from '~/services/fetchOrders.service'
import fetchBookings from '~/services/fetchBookings.service'
import ensureUnix from '~/utils/ensureUnix'

export const state = () => ({
    orders: [],
    bookings: {},
    usersData: {},
    ordersTablePage: 0
})

const vuetifyBackup = {}

export const actions = {
    async enableAdminMode ({ commit, dispatch, rootState }, context) {
        const { $vuetify } = context
        if (!rootState.user?.admin) {
            dispatch('user/updateAdminState', true, { root: true })
            await dispatch('fetchAdminData', context)
        }

        if (process.client) {
            if (rootState.admin_config.profileButton) { commit('ADD_PROFILE_BUTTON', rootState.admin_config.profileButton, { root: true }) }

            vuetifyBackup.light = { ...$vuetify.theme.themes.light }
            vuetifyBackup.dark = { ...$vuetify.theme.themes.dark }
            $vuetify.theme.themes.light = { ...$vuetify.theme.themes.light, ...rootState.admin_config.colorTheme.light }
            $vuetify.theme.themes.dark = { ...$vuetify.theme.themes.dark, ...rootState.admin_config.colorTheme.dark }
        }
    },
    disableAdminMode ({ commit, rootState }, context) {
        const { $vuetify } = context

        $vuetify.theme.themes.light = vuetifyBackup.light
        $vuetify.theme.themes.dark = vuetifyBackup.dark

        commit('UPDATE_ORDERS', [])
        commit('UPDATE_BOOKINGS', {})
        commit('UPDATE_USERS_DATA', {})

        commit('REMOVE_PROFILE_BUTTON', rootState.admin_config.profileButton.id, { root: true })
    },
    async fetchAdminData ({ dispatch, state }, context) {
        await dispatch('fetchOrders', context)
        await dispatch('fetchBookings', context)
    },
    async fetchOrders ({ commit, state }, context) {
        const orders = []
        const userPromises = []

        const ordersArray = await fetchOrders(context).catch(e => console.error(e))

        ordersArray.forEach((doc) => {
            orders.push(doc)

            if (!state.usersData[doc.userId]) {
                userPromises.push(fetchUserByUID(context, doc.userId).then(user => commit('UPDATE_USERS_DATA', { ...user, id: doc.userId })))
            }
        })

        commit('UPDATE_ORDERS', orders)
        await Promise.all(userPromises)
    },
    async fetchBookings ({ commit, rootState }, context) {
        const bookings = []
        const bookingsArray = await fetchBookings(context,
            getFirestoreTimestampFromToday(),
            getFirestoreTimestampFromToday({ days: rootState.admin_config.dataTable.showBookingsDaysAhead }, true)).catch(e => console.error(e)) || []

        bookingsArray.forEach(doc => bookings.push(doc))

        commit('UPDATE_BOOKINGS', bookings)
    }
}

export const getters = {
    getOrderData (state) {
        return state.orders.map(order => ({
            id: order.id,
            total: order.total,
            totalString: formatPrice(order.total),
            user: state.usersData[order.userId],
            items: order.items.map(item => ({ ...item, totalString: formatPrice(item.total) })),
            timestamp: ensureUnix(order.timestamp),
            timestampString: formatFirebaseTimestampAsString(order.timestamp)
        }))
    }
}

export const mutations = {
    UPDATE_ORDERS (state, payload) {
        state.orders = payload
    },
    UPDATE_BOOKINGS (state, payload) {
        state.bookings = payload
    },
    UPDATE_USERS_DATA (state, payload) {
        state.usersData[payload.id] = payload
    }
}
