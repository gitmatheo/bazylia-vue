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


.container {
  max-width: 1360px !important;
}


// ==== custom v-text-field START ====

.v-text-field {
  .v-label {
    &--active {
      transform: translateY(-21px) translateX(10px) scale(0.75)!important;
      background: white!important;
      width: fit-content!important;
      padding: 0 10px!important;
    }
  }
}

.v-text-field__slot {
  label {
    margin-left:20px!important;
    top: 14px!important;
  }
}

.v-input {
  &__slot {
    &:after {
      border: none!important;
    }
    &:before {
      border: none!important;
    }
  }
  input {
    max-height: 48px!important;
    padding-left: 30px!important;
  } 
}

// ==== custom v-text-field END ====

</style>
