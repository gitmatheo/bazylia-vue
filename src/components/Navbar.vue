<template>
  <v-toolbar id="navbar" class="navbar">
    <v-tab :class="{ active: path == '/' }" @click="setPath('/')" to="/"
      >Wyszukaj Pacjenta</v-tab
    >
    <v-tab
      :class="{ active: path == '/add-patient' }"
      @click="setPath('/add-patient')"
      to="/add-patient"
      >Dodaj Pacjenta</v-tab
    >
    <v-tab
      :class="{ active: path == '/rozliczenia' }"
      @click="setPath('/rozliczenia')"
      to="/rozliczenia"
      >Rozliczenia</v-tab
    >
    <v-spacer></v-spacer>
    <v-tab v-if="isAuthenticated" @click="logout">Wyloguj</v-tab>
  </v-toolbar>
</template>

<script>
import { mapMutations } from 'vuex'
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    isActive: true,
    path: '/',
    isAuthenticated: false
  }),
  methods: {
    ...mapMutations(['AUTHENTICATE_USER']),
    setPath(path) {
      this.path = path
    },
    logout() {
      console.log('LOGOUTTT')
      apiService
        .logout()
        .then(() => {
          sessionStorage.clear()
          this.$store.commit('AUTHENTICATE_USER', false)
          this.$router.push({ path: '/login' })
        })
        .catch(err => {
          console.log('logout error')
          console.error(err)
        })
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'AUTHENTICATE_USER') {
        this.isAuthenticated = state.isAuthenticated
      }
    })
  }
}
</script>

<style lang="scss">
/* a {
  text-decoration: none;
  color: black;
} */
template nav {
  background: white;
}

/* .navbar {
  box-shadow: none;
} */
.v-toolbar {
  background: #f4f4f4;
  box-shadow: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &__content {
    max-width: 1360px;
    margin: 0 auto;

    .v-tabs__div {
      &.active {
        border-bottom: 2px solid #20ce99;
        color: #20ce99;
      }
    }
  }
}
</style>
