<template>
  <div v-if="items">
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer/>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Добавить</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <template v-if="editedItem.image">
                        <template>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              {{editedItem.image}}
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-btn @click="removeEditImage" color="primary" dark>Удалить</v-btn>
                            </v-col>
                          </v-row>
                        </template>
                      </template>
                      <template v-else>
                        <v-file-input
                          :rules="rules"
                          label="Обложка"
                          @change="onFileChange"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="Выберите изображение"
                        />
                      </template>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.title" label="Заголовок"/>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.slug" label="URL"/>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea rows="2" v-model="editedItem.description" label="Описание"/>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  text @click="close">Отмена</v-btn>
                <v-btn color="blue primary" dark @click="save">Сохранить</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)">
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
  </div>
</template>

<script>
    import BrandsController from '@/pages/brands/controllers/brands-controller'
    export default {
        name: "Brands",
        mixins: [BrandsController]
    }
</script>
