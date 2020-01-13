<template>
  <v-container v-if="items" fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" class="text-right">
        <v-btn to="/brands/create" color="primary" dark class="mb-2">Добавить</v-btn>
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
            <nuxt-link :to="`/brands/edit?id=${item.id}`">
            <v-icon
              small
              class="mr-2">
              mdi-table-edit
            </v-icon>
            </nuxt-link>
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
    import BrandsController from '@/pages/brands/controllers/brands-controller'
    export default {
        name: "Brands",
        mixins: [BrandsController]
    }
</script>
