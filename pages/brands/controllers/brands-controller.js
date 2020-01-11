import ShopController from '@/pages/base-controllers/shop-controller'

export default {
  mixins: [ShopController],
  data: () => ({
    module: 'brands',
    headers: [
      {
        text: 'Название',
        align: 'left',
        sortable: false,
        value: 'title',
      },
      {
        text: 'Управление',
        value: 'action',
        align: 'right',
        sortable: false
      }
    ],
    editedItem: {
      id: '',
      slug: '',
      title: '',
      image: null,
      description: '',
      image_base_64:null
    },
    defaultItem: {
      id: '',
      slug: '',
      title: '',
      image: null,
      description: '',
      image_base_64:null
    },
  })
}
