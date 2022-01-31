<template>
  <div class="d-flex align-center pb-1">
    <v-menu
      offset-y
      open-on-hover
      :close-on-content-click="false"
      left
      attach=""
    >
      <template #activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <nuxt-link :is="!basketCount ? 'span' : 'router-link'" to="/basket">
            <v-badge
              color="accent"
              overlap
              :content="basketCount"
              :value="basketCount"
            >
              <v-icon color="white">
                mdi-basket
              </v-icon>
            </v-badge>
          </nuxt-link>
        </div>
      </template>
      <basketItemList />
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import basketItemList from '~/components/navbar/basketItemList.vue'
export default {
    components: {
        basketItemList
    },
    computed: {
        ...mapGetters('basket', ['basketCount'])
    }
}
</script>

<style>

</style>
