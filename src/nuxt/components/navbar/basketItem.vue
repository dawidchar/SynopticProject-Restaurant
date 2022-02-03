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
            <plusminusCounter :quantity="quantity" :disabled="noStock" @addItem="$emit('incrementItem', itemId)" @removeItem="$emit('decrementItem', itemId)" />
          </div>
        </div>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span v-if="noStock && showCounter" class="text-subtitle 2 error--text">No Stock</span>
        <span v-if="lowStock && showCounter" class="text-body-2 warning--text"> (Low Stock - <b>{{ stock }}</b>)</span>
      </v-list-item-subtitle>
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
        stock: {
            type: Number,
            default: 0
        },
        lowStockWarning: {
            type: Number,
            default: 10
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
    },
    computed: {
        noStock () {
            return this.stock === 0
        },
        lowStock () {
            return !this.noStock ? this.stock <= this.lowStockWarning : false
        }
    }
}
</script>

<style>

</style>
