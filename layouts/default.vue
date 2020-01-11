<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>
        <v-list-group
          prepend-icon="mdi-cart"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Магазин</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/categories/">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Категории</v-list-item-title>
          </v-list-item>
          <v-list-item to="/products/">
            <v-list-item-icon>
              <v-icon>mdi-cube</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Товары</v-list-item-title>
          </v-list-item>
          <v-list-item to="/brands/">
            <v-list-item-icon>
              <v-icon>mdi-hexagon</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Бренды</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Управление контентом</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
      <notifications position="bottom center" group="app" />
    </v-footer>
  </v-app>
</template>

<script>

    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: true
        })
    }
</script>
