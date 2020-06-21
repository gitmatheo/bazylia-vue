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
      v-if="userRole == 'ROLE_ADMIN'"
      >Rozliczenia Medycyna Pracy
    </v-tab>

    <v-tab
      :class="{ active: path == '/rozliczenia/specjalistyka' }"
      to="/rozliczenia/specjalistyka"
      v-if="userRole == 'ROLE_ADMIN'"
      >Rozliczenia Specjalistyka</v-tab
    >
    <v-spacer></v-spacer>
    <v-tab v-if="isAuthenticated" @click="logout" class="wyloguj">
      Wyloguj
      <span class="username"><v-icon>person</v-icon>{{ username }}</span>
    </v-tab>
  </v-toolbar>
</template>

<script>
import { mapMutations } from 'vuex'
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    isActive: true,
    path: '/',
    isAuthenticated: false,
    userRole: null
  }),
  watch: {
    $route(to, from) {
      this.path = to.path
    }
  },
  methods: {
    ...mapMutations(['AUTHENTICATE_USER']),
    logout() {
      apiService.logout().then(() => {
        localStorage.clear()
        this.$store.commit('AUTHENTICATE_USER', {
          isAuthenticated: false,
          role: null
        })
        this.$router.push({ path: '/login' })
      })
    }
  },
  mounted() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated')
    this.userRole = localStorage.getItem('ROLE')
    this.username = localStorage.getItem('username')
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'AUTHENTICATE_USER') {
        this.isAuthenticated = state.user.isAuthenticated
        this.userRole = state.user.role
        this.username = state.user.username
      }
    })
  }
}
</script>

<style lang="scss">
.wyloguj {
  .v-tabs__item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .username {
      color: black;
      font-size: 11px;
      display: flex;
      align-items: center;
      .v-icon {
        font-size: 16px;
        color: black;
      }
    }
  }
}

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
