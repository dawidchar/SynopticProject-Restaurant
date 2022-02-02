<template>
  <div class="pt-2">
    <h1 class="text-center mb-12">
      {{ text.admin_title }}
    </h1>
    <!-- <v-divider class="mb-10 mt-1" /> -->
    <ordersTable />
    <bookingsCalendar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ordersTable from '~/components/admin/ordersTable.vue'
import bookingsCalendar from '~/components/admin/bookingsCalendar.vue'
export default {
    components: {
        ordersTable,
        bookingsCalendar
    },
    computed: {
        ...mapState(['text'])
    }
}
</script>

<style>

</style>
