<template>
  <v-list dense width="300" class="px-1">
    <h4 :class="['h4', 'text-center', {'font-weight-black': !isBasketEmpty}, {'font-weight-light': isBasketEmpty}]">
      {{ listTitle }}
    </h4>
    <basketItem
      v-for="item in basketMenuItems"
      :key="item.total"
      :name="item.name"
      :item-id="item.itemId"
      :price="item.totalString"
      :quantity="item.quantity"
      :stock="item.stock"
      :low-stock-warning="ordering.lowStockWarning"
      :show-counter="true"
      @incrementItem="incrementItem"
      @decrementItem="decrementItem"
    />
    <div v-if="!isBasketEmpty">
      <v-divider inset class="mx-auto" />
      <basketItem
        name="Sub-Total"
        :price="basketTotal"
        :bold-name="true"
        :bold-price="true"
        :offset-right="true"
      />
    </div>
  </v-list>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import basketItem from '~/components/navbar/basketItem.vue'
export default {
    components: {
        basketItem
    },
    computed: {
        ...mapState(['ordering']),
        ...mapGetters(['basketMenuItems', 'basketTotal']),
        isBasketEmpty () {
            return !this.basketMenuItems.length
        },
        listTitle () {
            return this.isBasketEmpty ? 'Your Basket Is Empty' : 'Basket'
        }
    },
    methods: {
        ...mapActions('basket', ['updateItem']),
        incrementItem (itemId) {
            this.updateItem({ itemId, delta: 1 })
        },
        decrementItem (itemId) {
            this.updateItem({ itemId, delta: -1 })
        }
    }
}
</script>

<style>

</style>
