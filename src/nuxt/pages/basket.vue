<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.basket_title }}
    </h1>
    <v-divider class="mb-8 mt-1" />
    <basketTable />
    <v-btn class="float-right mt-6" color="primary">
      Checkout
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import basketTable from '~/components/basket/basketTable.vue'
export default {
    components: {
        basketTable
    },
    computed: {
        ...mapState(['text'])
    }
}
</script>

<style>

</style>
