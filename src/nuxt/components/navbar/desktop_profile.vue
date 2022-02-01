<template>
  <div class="d-flex align-center mr-4" :style="{cursor: !!user ? 'default' : 'pointer'}">
    <v-menu
      v-if="userExists"
      offset-y
      open-on-hover
      rounded="b-lg"
      nudge-left="15"
      attach=""
    >
      <template #activator="{ on, attrs }">
        <h4 v-bind="attrs" class="white--text font-weight-light" v-on="on">
          Hi <b>{{ user.name }}</b>!
        </h4>
      </template>
      <v-list>
        <nuxt-link :is="item.path ? 'router-link' : 'span'" v-for="(item, index) in items" :key="index" :to="item.path" @click="onClick(item.action)">
          <v-list-item link>
            <v-list-item-title :class="`${item.color || 'blue'}--text`">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
        </nuxt-link>
      </v-list>
    </v-menu>

    <nuxt-link v-else to="/login">
      <h4 class="white--text font-weight-light">
        Sign In
      </h4>
    </nuxt-link>
  </div>
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
    },
    computed: {
        userExists () {
            return !!Object.keys(this.user).length
        }
    },
    methods: {
        onClick (action) {
            if (action) {
                this.$store.dispatch(action, this)
            }
        }
    }
}
</script>

<style>

</style>
