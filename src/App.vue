<template>
  <v-app class="app">
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

<style lang="scss">
* {
  box-sizing: border-box;
}

.app {
  background: #F4F4F4 !important;
}

h2 {
  font-size: 24px;
}

.container {
  max-width: 1360px !important;
}


/* .app {
  background: url("./assets/background.jpg") !important;
  background-size: cover !important;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(246,249,252, 0.7) ;
    width: 100%;
    height: 100%;
  }
} */


</style>
