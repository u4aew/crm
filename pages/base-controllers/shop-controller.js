import Helper from "@/utils/helper";

export default {
  data: () => ({
    module: '',
    items: null,
    headers: []
  }),
  methods: {
    deleteItem(item) {
      if (confirm('Хотите удалить ?')) {
        this.$axios.$post(`${process.env.API_URL}/shop/${this.module}/delete/`, {
          data: item
        }).then(() => {
          const index = this.items.indexOf(item);
          this.items.splice(index, 1)

          this.$notify({
            type: 'success',
            group: 'app',
            title: 'Успех'
          })

        }).catch((e) => {
          this.$notify({
            type: 'error',
            group: 'app',
            title: 'Ошибка'
          })
        });
      }
    }
  },
  async beforeMount () {
    const { result } = await this.$axios.$get(`${process.env.API_URL}/shop/${this.module}/`);
    this.items = result
  }
}
