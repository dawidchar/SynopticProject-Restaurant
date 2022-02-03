<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <v-responsive class="mx-auto mt-12" max-width="1000px" width="90%" max-height="600px">
    <h2 class="text-center">
      Menu Editor
    </h2>
    <v-divider class="mb-6 mt-1 mx-auto" inset />
    <v-btn
      color="primary"
      class="ml-auto mt-5"
      style="display:block"
      outlined
      @click="addItem"
    >
      Add Item
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="menuItems"
      :loading="loading"
    >
      <template #item.itemId="{ item }">
        <span class="grey--text text-truncate">({{ item.itemId }})</span>
      </template>
      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <editMenuItemDialog :show.sync="dialog" :new-item="tempItemIsNew" :title="dialogTitle" :item.sync="tempItem" @updateItem="updateItem" />
    <statusSnackbar :data="snackbarData" :visible.sync="snackbarVisible" />
  </v-responsive>
</template>

<script>
import { mapState } from 'vuex'
import editMenuItemDialog from '~/components/admin/editMenuItemDialog.vue'
import updateMenuItemService from '~/services/updateMenuItem.service'
import deleteMenuItemService from '~/services/deleteMenuItem.service'
import statusSnackbar from '~/components/shared/statusSnackbar.vue'
export default {
    components: {
        editMenuItemDialog,
        statusSnackbar
    },
    data: () => ({
        headers: [
            { text: 'Item ID', value: 'itemId', width: '50px' },
            { text: 'Item', value: 'name' },
            { text: 'Description', value: 'description' },
            { text: 'Price (Pence)', value: 'price' },
            { text: 'Stock', value: 'stock' },
            { text: 'Actions', value: 'actions' }
        ],
        dialog: false,
        dialogTitle: '',
        tempItem: {},
        tempItemIsNew: false,
        loading: false,
        snackbarVisible: false,
        snackbarData: {}
    }),
    computed: {
        ...mapState('menu', ['items']),
        menuItems () {
            return Object.values(this.items)
        }
    },
    methods: {
        editItem (item) {
            if (this.loading) { return }
            // Creates a non-reactive copy version of the item
            // To Ensure we don't break Vue's reactivity Rules as the item is imported directly from VueX
            this.tempItem = Object.assign({}, item)
            this.tempItemIsNew = false
            this.dialogTitle = 'Edit Item'
            this.dialog = true
        },
        addItem () {
            if (this.loading) { return }
            this.tempItem = {}
            this.tempItemIsNew = true
            this.dialogTitle = 'Add Item'
            this.dialog = true
        },
        deleteItem (item) {
            this.loading = true
            deleteMenuItemService(this, item).then(() => {
                this.openSnackbar({
                    title: 'Delete Item - Successfull',
                    color: 'success'
                })
            }).catch((e) => {
                this.openSnackbar({
                    title: 'Delete Item - Error',
                    subtitle: e.message,
                    color: 'error',
                    timeout: 5000
                })
            }).finally(this.loading = false)
        },
        updateItem (item) {
            this.loading = true
            this.dialog = false

            updateMenuItemService(this, item).then(() => {
                this.openSnackbar({
                    title: `${this.dialogTitle} - Successfull`,
                    color: 'success'
                })
            }).catch((e) => {
                this.openSnackbar({
                    title: `${this.dialogTitle} - Error`,
                    subtitle: e.message,
                    color: 'error',
                    timeout: 5000
                })
            }).finally(this.loading = false)
        },
        openSnackbar (payload) {
            this.snackbarData = {
                title: payload.title || '',
                subtitle: payload.subtitle || '',
                color: payload.color || 'info',
                timeout: payload.timeout || 3000
            }

            this.snackbarVisible = true
        }
    }
}
</script>

<style>

</style>
