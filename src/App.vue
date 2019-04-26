<template>
  <v-app class="blue-grey lighten-1">
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      sideNav: false,

      menuItems: [
        { icon: "home", title: "Wyszukaj Pacjenta", link: "/" },
        { icon: "done", title: "Zrealizowane", link: "/completed" }
      ]
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
