<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase">
        <router-link to="/">Wyszukaj Pacjenta</router-link>
      </v-toolbar-title>
      <v-toolbar-title class="text-uppercase">
        <router-link to="/completed">Zrealizowane</router-link>
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav" app class="indigo">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        { icon: "home", title: "Wyszukaj Pacjenta", route: "/" },
        { icon: "done", title: "Zrealizowane", route: "/completed" },
        { icon: "library_books", title: "Raporty", route: "/raports" }
      ]
    };
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: #333;
}
</style>
