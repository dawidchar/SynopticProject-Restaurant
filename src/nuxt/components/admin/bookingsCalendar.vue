<template>
  <v-responsive class="mx-auto mt-12" max-width="1200px" max-height="600px">
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
    >
      <template #event="{ eventParsed, event }">
        <div>{{ event.name }}</div>
        <div style="margin-top:-5px">
          {{ formatEventDate(eventParsed) }}
        </div>
        <div>{{ event.numberOfPeople }} {{ event.numberOfPeople === 1 ? 'Person' : 'People' }}</div>
        <div>{{ event.phoneNumber }}</div>
      </template>
    </v-calendar>
  </v-responsive>
</template>

<script>
import { mapState } from 'vuex'
import firestoreToDateObject from '~/utils/firestoreToDateObject'
import getDateStringFromNow from '~/utils/getDateStringFromNow'
export default {
    computed: {
        ...mapState('admin', ['bookings']),
        ...mapState(['admin_config']),
        bookingEvents () {
            return this.bookings.map(booking => ({
                name: booking.name,
                start: firestoreToDateObject(booking.timestampStart),
                end: firestoreToDateObject(booking.timestampEnd),
                numberOfPeople: booking.numberOfPeople,
                phoneNumber: booking.phoneNumber,
                timed: true
            }))
        },
        startDate () {
            return getDateStringFromNow({}, 'YYYY-MM-DD')
        },
        endDate () {
            return getDateStringFromNow({ days: this.admin_config.dataTable.showBookingsDaysAhead || 3 }, 'YYYY-MM-DD')
        }
    },
    methods: {
        formatEventDate (event) {
            return `${String(event.start.hour).padStart(2, '0')}:${String(event.start.minute).padStart(2, '0')} - ${String(event.end.hour).padStart(2, '0')}:${String(event.end.minute).padStart(2, '0')}`
        }
    }
}
</script>

<style>
.v-calendar .v-event-timed {
  cursor: default !important;
}
</style>
