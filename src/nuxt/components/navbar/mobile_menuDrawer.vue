<template>
  <v-navigation-drawer
    v-model="showModel"
    fixed
    temporary
    class="text-left"
    right
    attch=""
  >
    <h4 v-if="loggedIn" class="font-weight-light mt-4 text-center">
      Hi <b>{{ userName }}</b>!<i>{{ adminText }}</i>
    </h4>
    <nuxt-link v-else to="/login">
      <h4 class="font-weight-light pt-4 pb-2 text-center">
        Sign In
      </h4>
    </nuxt-link>
    <v-divider class="mx-auto" inset />
    <v-list v-if="loggedIn">
      <nuxt-link :is="item.path ? 'router-link' : 'span'" v-for="(item, index) in profileButtons" :key="index" :to="item.path" @click="onClick(item.action)">
        <v-list-item link>
          <v-list-item-title :class="`${item.color || 'info'}--text`">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item>
      </nuxt-link>
    </v-list>
    <v-divider v-if="loggedIn" class="mx-auto" />
    <v-list>
      <nuxt-link v-for="(item, index) in menuButtons" :key="index" :to="item.path">
        <v-list-item link>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import navbarMenuButtonsMixin from '~/mixins/navbarMenuButtons.mixin'
import navbarProfileButtonsMixin from '~/mixins/navbarProfileButtons.mixin'
export default {
    mixins: [navbarProfileButtonsMixin, navbarMenuButtonsMixin],
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        showModel: {
            get () {
                return this.show
            },
            set (val) {
                this.$emit('updateShow', val)
            }
        }
    }
}
</script>

<style>

</style>
