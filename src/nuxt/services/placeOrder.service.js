export default ({ $axios, $config, $store, $store: { dispatch } }) => {
    return $axios.$post(`${$config.endpoints.api}/order`, {},
        { headers: { Authorization: $store.state.user?.userData?.token } }).then(() => {
        dispatch('basket/clearBasketItems', true)
    })
}
