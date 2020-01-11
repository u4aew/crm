<template>
  <v-container v-if="items" fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" class="text-right">
        <v-btn to="/categories/create" color="primary" dark class="mb-2">Добавить</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-2">
              mdi-table-edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
    import CategoriesController from '@/pages/categories/controllers/categories-controller'
    export default {
        name: "Categories",
        mixins: [CategoriesController]
    }
</script>
