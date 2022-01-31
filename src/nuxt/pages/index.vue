<template>
  <div>
    TEST -
    {{ user.name }}
    <h2>Menu:</h2>
    {{ menu.cheese_burger.name }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    async fetch () {
        await this.fetchMenu(this)
    },
    computed: {
        ...mapState('user', { user: 'userData' }),
        ...mapState('menu', { menu: 'items' })
    },
    methods: {
        ...mapActions('menu', ['fetchMenu'])
    }
}
</script>

<style>

</style>
