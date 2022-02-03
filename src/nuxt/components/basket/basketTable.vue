<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <v-data-table
    :headers="headers"
    :items="basketMenuItems"
    :mobile-breakpoint="mobileBreakpoint"
    :items-per-page="-1"
    hide-default-footer
    class="elevation-1"
  >
    <template #header.quantity="{ header }">
      <span class="pl-2">{{ header.text }} </span>
    </template>

    <template #item.name="{ item }">
      <span>{{ item.name }}</span>
      <span v-if="itemOutOfStock(item)" class="text-subtitle 2 error--text"> (No Stock)</span>
      <span v-if="itemLowStock(item)" class="text-body-2 warning--text"> (Low Stock - <b>{{ item.stock }}</b>)</span>
    </template>
    <template #item.price="{ item }">
      {{ item.priceString }}
    </template>
    <template #item.quantity="{ item }">
      <plusminusCounter :quantity="item.quantity" :disabled="itemOutOfStock(item)" @addItem="incrementItem(item.itemId)" @removeItem="decrementItem(item.itemId)" />
    </template>
    <template #item.total="{ item }">
      {{ item.totalString }}
    </template>
    <template #item.remove="{ item }">
      <v-btn icon @click="deleteItem(item.itemId)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template #body.append="{ isMobile }">
      <tr :class="{'v-data-table__mobile-row': isMobile}">
        <th class="body-2 font-weight-bold">
          Total
        </th>
        <th />
        <th />
        <th class="body-2 font-weight-bold">
          {{ basketTotal }}
        </th>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import plusminusCounter from '~/components/shared/plusminusCounter.vue'
export default {
    components: {
        plusminusCounter
    },
    data: () => ({
        headers: [{ text: 'Item', value: 'name' },
            { text: 'Price Per Item', value: 'price' },
            { text: 'Quantity', value: 'quantity' },
            { text: 'Total', value: 'total' },
            { text: 'Remove', value: 'remove', sortable: false, width: '25px', align: 'center' }
        ],
        // SSR renders mobile view by default
        // - As viewport size is not available during SSR
        // Change default to desktop
        // TODO - Add Viewport data to cookie or service worker or use User Agents
        mobileBreakpoint: 0
    }),
    computed: {
        ...mapState(['ordering']),
        ...mapGetters(['basketMenuItems', 'basketTotal'])
    },
    mounted () {
        // Enable Mobile View after fixing SSR // 600 - Default Value
        this.mobileBreakpoint = 600
    },
    methods: {
        ...mapActions('basket', ['updateItem', 'removeItem']),
        incrementItem (itemId) {
            this.updateItem({ itemId, delta: 1 })
        },
        decrementItem (itemId) {
            this.updateItem({ itemId, delta: -1 })
        },
        deleteItem (itemId) {
            this.removeItem(itemId)
        },
        itemOutOfStock (item) {
            return item.stock === 0
        },
        itemLowStock (item) {
            return item.stock !== 0 && item.stock < this.ordering.lowStockWarning
        }
    }
}
</script>

<style>

</style>
