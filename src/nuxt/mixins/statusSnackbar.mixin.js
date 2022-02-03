import statusSnackbar from '~/components/shared/statusSnackbar.vue'
export default {
    components: { statusSnackbar },
    data: () => ({
        snackbarVisible: false,
        snackbarData: {}
    }),
    methods: {
        openSnackbar (payload) {
            this.snackbarData = {
                title: payload.title || '',
                subtitle: payload.subtitle || '',
                color: payload.color || 'info',
                timeout: payload.timeout || 3000
            }

            this.snackbarVisible = true
        }
    }
}
