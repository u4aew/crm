import ShopController from '@/pages/base-controllers/shop-controller'
export default {
  mixins: [ShopController],
  data: () => ({
    module: 'categories',
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
    ]
  })
}
