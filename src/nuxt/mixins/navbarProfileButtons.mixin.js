import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('user', { user: 'userData' }),
        ...mapState('user', ['loggedIn']),
        ...mapState({ profileButtons: state => state.navbar.profileButtons }),
        userName () {
            return (this.user?.name || '').split(' ')[0] || ''
        },
        adminText () {
            return this.user.admin ? '- (Admin)' : ''
        }
    },
    methods: {
        onClick (action) {
            if (action) {
                this.$store.dispatch(action, this)
            }
        }
    }
}
