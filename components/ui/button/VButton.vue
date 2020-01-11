<template>
    <button v-on="$listeners" :disabled="disabled"
            :type="type"
            class="button"
            :class="[
            {'button_outline':outline},
            {'is-loading':loading},
            {'is-full':full}
            ]">
        <span class="button__content">
            <span class="button__title">
                <span class="button__caption">
                 <slot/>
                </span>
                <span v-if="hasSlot(slots.icon)" class="l-ml-10 button__icon button__icon_normal">
                    <slot name="icon"></slot>
                </span>
                <span v-if="hasSlot(slots.iconHover)" class="l-ml-10 button__icon button__icon_hover">
                    <slot name="icon-hover"></slot>
                </span>
            </span>
        </span>
    </button>
</template>
<script>
    /**
     * Базовый компонент кнопки
     * @type свойство для для определения типа кнопки
     */

    import BaseComponent from '~/components/base/BaseComponent'

    const props = {
        type: ['button', 'submit']
    };

    const slots = {
        icon: 'icon',
        iconHover: 'icon-hover',
        iconActive: 'icon-active'
    };

    export default {
        name: 'VButton',
        extends: BaseComponent,
        props: {
            type: {
                type: String,
                required: false,
                validator(value) {
                    return props.type.includes(value)
                }
            },
            full: {
                type: Boolean,
                required: false
            },
            outline: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                slots
            }
        }
    }
</script>
