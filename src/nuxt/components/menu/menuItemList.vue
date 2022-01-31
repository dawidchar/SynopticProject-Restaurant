<template>
  <div>
    <h2 class="text-center font-weight-regular mb-4">
      Menu Items
    </h2>
    <div class="d-flex flex-wrap">
      <menuItemCard
        v-for="item in menuItems"
        :key="item.slug"
        class="mx-4 my-2 align-self-center"
        :itemid="item.slug"
        :title="item.name"
        :description="item.description"
        :price="item.price"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import menuItemCard from '~/components/menu/menuItemCard.vue'
export default {
    components: {
        menuItemCard
    },
    async fetch () {
        await this.fetchMenu(this)
    },
    computed: {
        ...mapState(['text']),
        ...mapState('menu', { menuItems: 'items' })
    },
    methods: {
        ...mapActions('menu', ['fetchMenu'])
    }
}
</script>

<style>

</style>
