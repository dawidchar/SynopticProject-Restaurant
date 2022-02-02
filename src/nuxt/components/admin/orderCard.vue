<template>
  <v-card width="300" class="d-flex flex-column">
    <v-card-title class="d-block">
      <h4 class="text-center">
        {{ order.user.name }}
      </h4>
      <div class="body-2 text-center">
        {{ order.timestampString }}
      </div>
      <v-divider class="mt-1 mx-auto" inset />
      <v-list class="px-1 body-2" dense>
        <v-list-item v-for="item in order.items" :key="item.itemId">
          <v-list-item-content class="d-block">
            <b>{{ item.quantity }}x</b> {{ item.name }}
          </v-list-item-content>
          <v-list-item-content class="text-right justify-end font-weight-light">
            {{ item.totalString }}
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-1 mx-auto" />
        <v-list-item class="body-1">
          <v-list-item-content class="d-block font-weight-bold">
            Total
          </v-list-item-content>
          <v-list-item-content class="text-right justify-end font-weight-light">
            {{ order.totalString }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
    props: {
        order: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>
