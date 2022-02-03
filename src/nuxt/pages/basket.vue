<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.basket_title }}
    </h1>
    <v-divider class="mb-8 mt-1" />
    <basketTable />
    <v-btn class="float-right mt-6" color="primary" :loading="loading" @click="checkout">
      Checkout
    </v-btn>
    <statusSnackbar :data="snackbarData" :visible.sync="snackbarVisible" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import basketTable from '~/components/basket/basketTable.vue'
import placedOrderService from '~/services/placeOrder.service'
import statusSnackbarMixin from '~/mixins/statusSnackbar.mixin'
export default {
    components: {
        basketTable
    },
    mixins: [statusSnackbarMixin],
    data: () => ({
        loading: false
    }),
    computed: {
        ...mapState(['text'])
    },
    methods: {
        checkout () {
            this.loading = true
            placedOrderService(this).then(() => {
                this.openSnackbar({
                    title: 'Placed Order Successfully',
                    color: 'success'
                })
            }).catch((e) => {
                this.openSnackbar({
                    title: 'Error Placing Order',
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
