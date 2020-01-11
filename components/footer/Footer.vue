<template>
    <div class="footer block">
        <div class="footer__wrapper block-wrapper">
            <div class="footer__major">
                <div class="footer__cols">
                    <div class="footer__cols-list">
                        <div class="footer__cols-item footer__cols-item_nav">
                            <div class="footer__nav">
                                <div class="footer__nav-title">
                                    Пользователям ntcn
                                </div>
                                <div class="footer__nav-list">
                                    <div class="footer__nav-item">
                                        <nuxt-link to="/team" class="footer__nav-link">Пункты приёма</nuxt-link>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">Вывоз лома</a>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">Новости</a>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">О нас</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer__cols-item footer__cols-item_nav">
                            <div class="footer__nav">
                                <div class="footer__nav-title">
                                    Владельцам пунктов приема
                                </div>
                                <div class="footer__nav-list">
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">Пункты приёма</a>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">Вывоз лома</a>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">Новости</a>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">О нас</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer__cols-item footer__cols-item_nav">
                            <div class="footer__nav">
                                <div class="footer__nav-title">
                                    Информация
                                </div>
                                <div class="footer__nav-list">
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">Пункты приёма</a>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">Вывоз лома</a>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">Новости</a>
                                    </div>
                                    <div class="footer__nav-item">
                                        <a href="#" class="footer__nav-link">О нас</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer__cols-item footer__cols-item_contact">
                            <div class="footer__callback">
                                <Vbutton outline> Напишите нам</Vbutton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer__minor">
                <div class="footer__minor-wrapper">
                    <div class="footer__minor-main">
                        <div class="footer__copyright">
                            © Ломприём 2019. Все права защищены.
                            <br>
                            Указанная стоимость товаров и условия их приобретения действительны по состоянию на текущую
                            дату.
                        </div>
                    </div>
                    <div class="footer__minor-side">
                        <div class="footer__limitations"
                             title="Информация, представленная на сайте, предназначена для лиц старше 18 лет">
                            +18
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="stylus">
    @import "~assets/style/components/footer.styl"
</style>

<script>
    import Vbutton from "~/components/ui/button/VButton"

    export default {
        name: 'Footer',
        components: {
            Vbutton
        }
    }
</script>



