import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            menuButtons: state => state.navbar.menuButtons
        })
    }
}
