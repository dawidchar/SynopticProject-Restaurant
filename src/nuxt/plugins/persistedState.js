import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    // TODO - Use Cookies/Headers
    createPersistedState({
        key: 'vuex',
        paths: ['basket.items']
    })(store)
}
