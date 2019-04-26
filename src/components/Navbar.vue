<template>
  <nav>
    <div>
      <v-toolbar color="error" dark tabs>
        <v-toolbar-title>Bazylia Logo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat>Zaloguj</v-btn>
          <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
        </v-toolbar-items>
        <template v-slot:extension>
          <v-tabs v-model="tab" color="error" grow>
            <v-tabs-slider color="white"></v-tabs-slider>
            <v-tab class="menu-link">
              <router-link to="/">Wyszukaj Pacjenta</router-link>
            </v-tab>
            <v-tab class="menu-link">
              <router-link to="/add-patient">Dodaj Pacjenta</router-link>
            </v-tab>
            <v-tab class="menu-link">
              <router-link to="/completed">Zrealizowane</router-link>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </div>

    <v-navigation-drawer v-model="sideNav" app class="danger">
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
      ],
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
}
.menu-link a {
  color: white;
  font-size: 1.3rem;
  text-decoration: none;
  width: 100%;
  height: 100%;
}
</style>
