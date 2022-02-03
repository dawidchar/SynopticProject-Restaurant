export default ({ $axios, $config }, payload) => {
    return $axios.post(`${$config.endpoints.api}/booking`, payload,
        { validateStatus: status => status < 400 })
}
