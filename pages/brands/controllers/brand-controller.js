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
    messageSuccess: 'Добавлен новый бренд',
    messageError: 'Ошибка',
    id: null,
    slug: null,
    title: null,
    description: null,
    image_base_64: null,
    remove_old_image: false
  }),
  computed: {
    formData () {
      return {
        id: this.id,
        slug: this.slug,
        title: this.title,
        description: this.description,
        image_base_64: this.image_base_64,
        remove_old_image: this.remove_old_image
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
      this.remove_old_image = true;
      if (Helper.isDefined(file)) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.image_base_64 = reader.result;
        }
      } else {
        this.image_base_64 = null
      }
    },
    sendData() {
      return this.$axios
        .$post(`${process.env.API_URL}/shop/brands/create/`, { data: this.formData })
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
          this.sendData()
          .then(() => {
            this.$router.replace({ path: '/brands' });
            this.$notify({
              type: 'success',
              group: 'app',
              title: this.messageSuccess
            })
          })
          .catch((e) => {
            this.$notify({
              type: 'error',
              group: 'app',
              title: this.messageError
            })
          })
      }
    }
  }
}
