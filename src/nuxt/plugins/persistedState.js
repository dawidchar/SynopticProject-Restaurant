import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    // Avoids Client Mismatching SSR error
    setTimeout(() => {
        // TODO - Use Cookies/Headers
        createPersistedState({
            key: 'vuex',
            paths: ['basket.items']
        })(store)
    }, 0)
}
