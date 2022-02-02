import { getDocs, getDoc } from 'firebase/firestore'
import formatPrice from '~/utils/priceStringFormatter'
import formatFirebaseTimestampAsString from '~/utils/formatFirebaseTimestampAsString'
import getFirestoreTimestampFromToday from '~/utils/getFirestoreTimestampFromToday'

export const state = () => ({
    orders: [],
    bookings: {},
    usersData: {},
    cache: {},
    ordersTablePage: 0
})

export const actions = {
    async fetchAdminData ({ dispatch }, context) {
        await dispatch('fetchOrders', context)
        await dispatch('fetchBookings', context)
    },
    async fetchOrders ({ commit, state }, { $firestore }) {
        const orders = []
        const userPromises = []

        const orderColSnapshot = await getDocs($firestore.query.orders)

        orderColSnapshot.forEach((doc) => {
            if (!doc.exists()) { return }

            const docData = { ...doc.data(), id: doc.id }
            orders.push(docData)

            if (!state.usersData[docData.userId]) {
                userPromises.push(getDoc($firestore.doc.user(docData.userId)).then((userDocSnap) => {
                    if (!userDocSnap.exists()) { return }

                    commit('UPDATE_USERS_DATA', { ...userDocSnap.data(), id: userDocSnap.id })
                }))
            }
        })

        commit('UPDATE_ORDERS', orders)
        await Promise.all(userPromises)
    },
    async fetchBookings ({ commit, rootState }, { $firestore }) {
        const bookings = []

        const bookingColSnapshot = await getDocs(
            $firestore.query.bookingsBetween(
                getFirestoreTimestampFromToday(),
                getFirestoreTimestampFromToday({ days: rootState.admin_config.dataTable.showBookingsDaysAhead }, true)))

        bookingColSnapshot.forEach((doc) => {
            console.log('doc')
            if (!doc.exists()) { return }

            const docData = { ...doc.data(), id: doc.id }
            bookings.push(docData)
        })

        console.log(bookings)

        commit('UPDATE_BOOKINGS', bookings)
    }
}

export const getters = {
    getOrderData (state, _, rootState) {
        return state.orders.map(order => ({
            id: order.id,
            total: order.total,
            totalString: formatPrice(order.total),
            user: state.usersData[order.userId],
            items: order.items.map(item => ({ ...rootState.menu.items[item.itemId], ...item, totalString: formatPrice(item.total) })),
            timestamp: order.timestamp.seconds,
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
