<template>
  <div>
    <h2 class="text-center font-weight-regular mb-4">
      Menu Items
    </h2>
    <div class="d-flex flex-wrap justify-space-around justify-md-start">
      <menuItemCard
        v-for="item in menuItems"
        :key="item.itemId"
        class="mx-4 my-2 align-stretch"
        :item-id="item.itemId"
        :title="item.name"
        :description="item.description"
        :price="item.price"
        :stock="item.stock"
        :low-stock-warning="ordering.lowStockWarning"
        :logged-in="loggedIn"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import menuItemCard from '~/components/menu/menuItemCard.vue'
export default {
    components: {
        menuItemCard
    },
    computed: {
        ...mapState(['text', 'ordering']),
        ...mapState('menu', { menuItems: 'items' }),
        ...mapState('user', ['loggedIn'])
    }
}
</script>

<style>

</style>
