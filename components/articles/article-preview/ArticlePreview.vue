<template>
  <nuxt-link :to="'articles/' + model.slug" class="article-preview">
      <div class="article-preview__wrapper">
        <div class="article-preview__side">
          <div class="article-preview__img"></div>
          <div class="article-preview__tags"></div>
        </div>
        <div class="article-preview__main">
          <div class="article-preview__title">
            {{model.title}}
          </div>
          <div class="article-preview__desc">
            {{model.desc}}
          </div>
        </div>
      </div>
  </nuxt-link>
</template>

<style lang="stylus">
  @import "~assets/style/components/article-preview.styl"
</style>

<script>
  export default {
      name:'ArticlePreview',
      props: {
          model: {
              type: Object
          }
      }
  }
</script>

