<template>
  <v-container fluid>
    <v-data-iterator
      :items="ordersData"
      :items-per-page="5"
    >
      <template #header>
        <h3 class="text-center">
          Orders
        </h3>
        <div class="text-center">
          Showing Last <b>{{ lastNumberOfOrders }}</b> Orders 🧾
        </div>
        <v-divider class="mb-6 mt-1 mx-auto" inset />
      </template>
      <template #default="{ items }">
        <div class="d-flex flex-wrap justify-space-around justify-md-start">
          <orderCard
            v-for="order in items"
            :key="order.id"
            :order="order"
            class="mx-4 my-2 align-stretch"
          />
        </div>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import orderCard from '~/components/admin/orderCard.vue'
export default {
    components: {
        orderCard
    },
    computed: {
        ...mapGetters('admin', { ordersData: 'getOrderData' }),
        ...mapState(['admin_config']),
        lastNumberOfOrders () {
            return this.admin_config.dataTable.shopNumberOfLastOrders
        }
    }
}
</script>

<style>

</style>
