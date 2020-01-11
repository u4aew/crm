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
                    <v-file-input
                      label="Обложка"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Выберите изображение"
                      @change="onFileChange"
                    />
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
    import Helper from "@/utils/helper";
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'

    const reader = new FileReader();

    export default {
        mixins: [validationMixin],
        validations: {
            title: { required},
            slug: { required}
        },
        data: () => ({
            title: null,
            description: null,
            slug: null,
            parent_id: null,
            image_base_64: null,
            categories: [{
                title: 'Не выбрано', value: null
            }]
        }),
        computed: {
            formData () {
                return {
                    slug: this.slug,
                    title: this.title,
                    parent_id: this.parent_id,
                    description: this.description,
                    image_base_64: this.image_base_64
                }
            },
            titleErrors () {
                const errors = [];
                if (!this.$v.title.$dirty) return errors;
                !this.$v.title.required && errors.push('Заголовок обязательный');
                return errors
            },
            slugErrors () {
                const errors = [];
                if (!this.$v.slug.$dirty) return errors;
                !this.$v.slug.required && errors.push('Slug обязательный');
                return errors
            }
        },
        methods: {
            onFileChange(file) {
                if (Helper.isDefined(file)) {
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        this.image_base_64 = reader.result;
                    }
                } else {
                    this.image_base_64 = null
                }
            },
            submit () {
                this.$v.$touch();
                let existErrors = false;

                if (Helper.isNotEmpty(this.titleErrors)) {
                    existErrors = true
                }
                if (Helper.isNotEmpty(this.slugErrors)) {
                    existErrors = true
                }
                if (!existErrors) {
                    this.$axios
                        .$post(`${process.env.API_URL}/shop/categories/create/`, { data: this.formData })
                        .then(() => {
                          this.$router.replace({ path: '/categories' });
                          this.$notify({
                              type: 'success',
                              group: 'app',
                              title: 'Добавлена новая категория'
                          })
                        })
                        .catch((e) => {
                          this.$notify({
                              type: 'error',
                              group: 'app',
                              title: 'Ошибка'
                        })
                    })
                }
            }
        },
        async beforeMount () {
            try {
                const { result } = await this.$axios.$get(`${process.env.API_URL}/shop/categories/`);
                result.forEach((item) => {
                    this.categories.push(item)
                })
            } catch (e) {
                this.$notify({
                    type: 'error',
                    group: 'app',
                    title: 'Ошибка'
                })
            }
        }
    }
</script>
