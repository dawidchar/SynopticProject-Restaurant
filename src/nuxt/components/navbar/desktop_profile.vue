<template>
  <v-col class="d-flex justify-end py-0">
    <div class="d-flex align-center mr-3" :style="{cursor: !!user ? 'default' : 'pointer'}">
      <v-menu
        v-if="!!user"
        offset-y
        open-on-hover
        rounded="b-lg"
        nudge-left="14"
        attach=""
      >
        <template #activator="{ on, attrs }">
          <h4 v-bind="attrs" class="white--text font-weight-light" v-on="on">
            Hi <b>{{ user.name }}</b>!
          </h4>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" link>
            <nuxt-link :to="item.path || ''" class="blue--text">
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>

      <h4 v-else class="white--text font-weight-light">
        Sign In
      </h4>
    </div>
  </v-col>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => ({})
        },
        items: {
            type: Array,
            default: () => ([])
        }
    }
}
</script>

<style>

</style>
