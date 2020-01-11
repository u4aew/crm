<script>
    /** Базовый компонент
     * @disabled свойство для отображения блокировки компонента
     * @loading свойство для отображения загрузки компонента
     */
    import SlotManager from '~/plugins/helpers/slot-manager'

    export default {
        mixins: [SlotManager],
        props: {
            disabled: {
                type: Boolean,
                required: false
            },
            loading: {
                type: Boolean,
                required: false
            },
            error: {
                type: Boolean,
                required: false
            }
        }
    }
</script>
