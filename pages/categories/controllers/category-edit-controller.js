import CategoryController from '@/pages/categories/controllers/category-controller'
export default {
  mixins: [CategoryController],
  data () {
    return {
      messageSuccess: 'Категория обновлена',
      result: null,
      image_id: null
    }
  },
  methods: {
    removeImg () {
      this.remove_old_image = true;
      this.image_id = null
    },
    sendData() {
      return this.$axios
        .$post(`${process.env.API_URL}/shop/categories/update/`, { data: this.formData })
    },
  },
  async beforeMount () {
    const categoryId = this.$route.query.id;
    try {
      const { result } = await this.$axios
        .$get(`${process.env.API_URL}/shop/categories/info`, { params: { id:categoryId }});
      const {title, description, slug, parent_id, id, image_id} = result;

      this.id = id;
      this.slug = slug;
      this.title = title;
      this.parent_id = parent_id;
      this.description = description;
      this.image_id = image_id

    } catch (e) {
      this.$notify({
        type: 'error',
        group: 'app',
        title: this.messageError
      })
    }
  }
}
