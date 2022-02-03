<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.book_title }}
    </h1>
    <v-divider class="mb-12 mt-1" />
    <v-responsive class="mx-auto pa-1" width="70vw" max-width="600px">
      <bookTableForm :loading="loading" @book="bookTable" />
    </v-responsive>
    <statusSnackbar :data="snackbarData" :visible.sync="snackbarVisible" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bookTableForm from '~/components/book/bookTableForm.vue'
import bookTableService from '~/services/bookTable.service'
import statusSnackbarMixin from '~/mixins/statusSnackbar.mixin'
export default {
    components: {
        bookTableForm
    },
    mixins: [statusSnackbarMixin],
    data: () => ({
        loading: false
    }),
    computed: {
        ...mapState(['text'])
    },
    methods: {
        bookTable (payload) {
            this.loading = true
            bookTableService(this, payload).then(() => {
                this.openSnackbar({
                    title: 'Booked Table Successfully',
                    color: 'success'
                })
            }).catch((e) => {
                this.openSnackbar({
                    title: 'Error booking table',
                    subtitle: e?.response?.data || e.message,
                    color: 'error',
                    timeout: 5000
                })
            }).finally(() => { this.loading = false })
        }
    }
}
</script>

<style>

</style>
