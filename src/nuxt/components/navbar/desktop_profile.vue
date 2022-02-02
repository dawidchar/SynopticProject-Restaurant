<template>
  <div class="d-flex align-center mr-4" :style="{cursor: loggedIn ? 'default' : 'pointer'}">
    <v-menu
      v-if="loggedIn"
      offset-y
      open-on-hover
      rounded="b-lg"
      nudge-left="10"
      transition="slide-y-transition"
      attach=""
    >
      <template #activator="{ on, attrs }">
        <h4 v-bind="attrs" class="white--text font-weight-light py-2" v-on="on">
          Hi <b>{{ userName }}</b>!<i>{{ adminText }}</i>
        </h4>
      </template>
      <v-list>
        <nuxt-link :is="item.path ? 'router-link' : 'span'" v-for="(item, index) in profileButtons" :key="index" :to="item.path" @click="onClick(item.action)">
          <v-list-item link>
            <v-list-item-title :class="`${item.color || 'info'}--text`">
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
import navbarProfileButtonsMixin from '~/mixins/navbarProfileButtons.mixin'
export default {
    mixins: [navbarProfileButtonsMixin]
}
</script>

<style>

</style>
