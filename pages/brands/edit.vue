<template>
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <v-tabs class="pa-2">
          <v-tab>Базовая информация</v-tab>
          <v-tab>Свойства категории</v-tab>
          <v-tab>SEO</v-tab>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <form>
                    <template v-if="image_id">
                      <v-row align="center">
                        <v-col cols="8">
                          <v-text-field
                            v-model="image_id"
                            label="ID Изображения"
                            disabled
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-btn block color="primary" @click="removeImg" dark class="ma-1">Удалить</v-btn>
                        </v-col>
                      </v-row>
                    </template>
                    <template v-else>
                      <v-file-input
                        label="Обложка"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Выберите изображение"
                        @change="onFileChange"
                      />
                    </template>
                    <v-text-field
                      v-model="title"
                      :error-messages="titleErrors"
                      label="Заголовок"
                      required
                      @input="$v.title.$touch()"
                      @blur="$v.title.$touch()"
                    />
                    <v-text-field
                      v-model="slug"
                      required
                      label="Slug"
                      :error-messages="slugErrors"
                      @input="$v.slug.$touch()"
                      @blur="$v.slug.$touch()"
                    />
                    <v-textarea
                      rows="2"
                      v-model="description"
                      label="Описание"
                    />
                  </form>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <form>
                    <v-select
                      v-model="parent_id"
                      :items="categories"
                      item-text="title"
                      item-value="id"
                      label="Родитель"
                    />
                  </form>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              seo штучки
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-container class="text-right">
        <v-btn to="/categories" class="ma-1">Отмена</v-btn>
        <v-btn color="primary" dark class="ma-1" @click="submit">Сохранить</v-btn>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
    import BrandEditController from '@/pages/brands/controllers/brand-edit-controller'
    export default {
        mixins: [BrandEditController]
    }
</script>
