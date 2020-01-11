<template>
    <div class="block">
        <div class="block-wrapper">
            <Intro/>
        </div>
    </div>
</template>

<script>
    import Intro from '~/components/intro/Intro'

    export default {
        head: {
            title: 'Домашнаяя страница'
        },
        components: {
            Intro
        },
        data(context) {
            return {name: 'World'}
        }
    }
</script>
