<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.menu_title }}
    </h1>
    <v-divider class="mb-8 mt-1" />
    <menuItemList />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import menuItemList from '~/components/menu/menuItemList.vue'
export default {
    components: {
        menuItemList
    },
    computed: {
        ...mapState(['text'])
    }
}
</script>

<style>

</style>
