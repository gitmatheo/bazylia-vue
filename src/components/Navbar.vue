<template>
  <v-toolbar id="navbar" class="navbar">
    <v-tab :class="{ active: path == '/' }" to="/">Wyszukaj Pacjenta</v-tab>
    <v-tab :class="{ active: path == '/add-patient' }" to="/add-patient"
      >Dodaj Pacjenta</v-tab
    >
    <v-tab
      :class="{ active: path == '/zarejestrowane-wizyty' }"
      to="/zarejestrowane-wizyty"
      >Zarejestrowane wizyty</v-tab
    >
    <v-tab
      :class="{ active: path == '/rozliczenia/medycyna-pracy' }"
      to="/rozliczenia/medycyna-pracy"
      >Rozliczenia Medycyna Pracy
    </v-tab>

    <v-tab
      :class="{ active: path == '/rozliczenia/specjalistyka' }"
      to="/rozliczenia/specjalistyka"
      >Rozliczenia Specjalistyka</v-tab
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
  watch: {
    $route(to, from) {
      console.log(from)
      this.path = to.path
    }
  },
  methods: {
    ...mapMutations(['AUTHENTICATE_USER']),
    logout() {
      apiService.logout().then(() => {
        localStorage.clear()
        this.$store.commit('AUTHENTICATE_USER', false)
        this.$router.push({ path: '/login' })
      })
    }
  },
  mounted() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated')
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'AUTHENTICATE_USER') {
        this.isAuthenticated = state.isAuthenticated
      }
    })
  }
}
</script>

<style lang="scss">
template nav {
  background: white;
}

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
