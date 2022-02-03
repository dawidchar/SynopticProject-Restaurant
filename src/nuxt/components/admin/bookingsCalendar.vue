<template>
  <v-responsive class="mx-auto mt-12" max-width="1000px" width="90%" max-height="600px">
    <h2 class="text-center">
      Bookings
    </h2>
    <v-divider class="mb-6 mt-1 mx-auto" inset />
    <v-calendar
      color="primary"
      type="custom-daily"
      :start="startDate"
      :end="endDate"
      :events="bookingEvents"
      :event-ripple="false"
    />
  </v-responsive>
</template>

<script>
import { mapState } from 'vuex'
import firestoreToDateObject from '~/utils/firestoreToDateObject'
import getDateStringFromNow from '~/utils/getDateStringFromNow'
export default {
    computed: {
        ...mapState('admin', ['bookings']),
        bookingEvents () {
            return this.bookings.map(booking => ({
                name: booking.name,
                start: firestoreToDateObject(booking.timestampStart),
                end: firestoreToDateObject(booking.timestampEnd),
                timed: true
            }))
        }
    },
    data: () => ({
        startDate: getDateStringFromNow({}, 'YYYY-MM-DD'),
        endDate: getDateStringFromNow({ days: 3 }, 'YYYY-MM-DD')
    })
}
</script>

<style>
.v-calendar .v-event-timed {
  cursor: default !important;
}
</style>
