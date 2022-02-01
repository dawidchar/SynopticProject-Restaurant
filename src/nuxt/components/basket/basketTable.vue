<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <v-data-table
    :headers="headers"
    :items="basketMenuItems"
    :mobile-breakpoint="mobileBreakpoint"
    :items-per-page="-1"
    :loading="loading"
    hide-default-footer
    class="elevation-1"
  >
    <template #header.quantity="{ header }">
      <span class="pl-2">{{ header.text }} </span>
    </template>

    <template #item.price="{ item }">
      {{ item.priceString }}
    </template>
    <template #item.quantity="{ item }">
      <plusminusCounter :quantity="item.quantity" @addItem="addItem(item.itemId)" @removeItem="removeItem(item.itemId)" />
    </template>
    <template #item.total="{ item }">
      {{ item.totalString }}
    </template>
    <template slot="body.append">
      <tr>
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
import { mapGetters, mapActions } from 'vuex'
import plusminusCounter from '~/components/shared/plusminusCounter.vue'
export default {
    components: {
        plusminusCounter
    },
    data: () => ({
        headers: [{ text: 'Item', value: 'name' },
            { text: 'Price Per Item', value: 'price' },
            { text: 'Quantity', value: 'quantity' },
            { text: 'Total', value: 'total' }
        ],
        // SSR renders mobile view by default
        // - As viewport size is not available during SSR
        // Change default to desktop
        // TODO - Add Viewport data to cookie or service worker or use User Agents
        mobileBreakpoint: 0
    }),
    computed: {
        ...mapGetters(['basketMenuItems', 'basketTotal']),
        loading () {
            return process.server
        }
    },
    mounted () {
        // Enable Mobile View after fixing SSR // 600 - Default Value
        this.mobileBreakpoint = 600
    },
    methods: {
        ...mapActions('basket', ['updateItem']),
        addItem (itemId) {
            this.updateItem({ itemId, delta: 1 })
        },
        removeItem (itemId) {
            this.updateItem({ itemId, delta: -1 })
        }
    }
}
</script>

<style>

</style>
