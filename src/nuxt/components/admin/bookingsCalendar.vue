<template>
  <v-calendar
    color="primary"
    type="custom-daily"
    start="2022-02-02"
    :max-days="3"
  >
    <template #day-body>
      <div
        class="text-center"
      >
        TEST
      </div>
    </template>
  </v-calendar>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['bookings'])
    }
}
</script>

<style>

</style>
