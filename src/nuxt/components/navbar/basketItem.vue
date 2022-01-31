<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title
        :class="['d-flex', 'flex-row', 'justify-space-between', {'pr-2': offsetRight}]"
      >
        <span :class="['body-2', 'text-truncate', {'font-weight-bold': boldName}]">
          {{ name }}
        </span>
        <div class="d-flex align-center">
          <span :class="['body-2', {'font-weight-bold': boldPrice}]">
            {{ price }}
          </span>
          <div v-if="showCounter" class="d-flex align-center">
            <v-divider
              class="mx-2"
              vertical
            />
            <plusminusCounter :quantity="quantity" @addItem="$emit('addItem', itemId)" @removeItem="$emit('removeItem', itemId)" />
          </div>
        </div>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import plusminusCounter from '~/components/shared/plusminusCounter.vue'
export default {
    components: {
        plusminusCounter
    },
    props: {
        name: {
            type: String,
            required: true
        },
        itemId: {
            type: String,
            default: ''
        },
        price: {
            type: [String, Number],
            default: ''
        },
        quantity: {
            type: [String, Number],
            default: 0
        },
        showCounter: {
            type: Boolean,
            default: false
        },
        boldName: {
            type: Boolean,
            default: false
        },
        boldPrice: {
            type: Boolean,
            default: false
        },
        offsetRight: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>

</style>
