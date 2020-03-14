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
// import API from './constants/api';
// import axios from 'axios';
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      sideNav: false,
      role: '',
      isAuthenticated: false,
      menuItems: [
        { icon: "home", title: "Wyszukaj Pacjenta", link: "/" },
        { icon: "done", title: "Zrealizowane", link: "/completed" }
      ]
    };
  },
  created(){

    // this.role = sessionStorage.getItem('ROLE');
    // this.isAuthenticated = sessionStorage.getItem('isAuthenticated');
    // console.log("SIemaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // console.log(this.role);
    // console.log(this.isAuthenticated)

    //   axios
    //     .get(`${API.url}/login`)
    //     .then(res => {
    //       console.log("Elo from /login")
    //       console.log(res);
    //     })
    //     .catch(err => console.error(err));
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

li {
    list-style: none;
}


.container {
  max-width: 1360px !important;
  margin-top: 100px;
}

/* .accent--text {
  color: #20CE99 !important;
  caret-color: #20CE99 !important;
} */


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

.v-messages__message {
  margin-left: 20px;
}

.component-wrapper {
  padding: 60px 120px;
}

// ==== custom v-text-field END ====

</style>
