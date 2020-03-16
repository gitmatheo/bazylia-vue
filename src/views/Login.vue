<template>
  <v-container row justify-center>
    <div class="login-wrapper">
      <h1>Zaloguj się.</h1>

      <div class="form__input-wrapper">
        <v-text-field
          v-model="login"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.requiredLogin]"
          name="input-10-1"
          label="Login"
          hint="At least 8 characters"
          counter
          outlined
          rounded
          @click:append="show1 = !show1"
        ></v-text-field>
      </div>

      <div class="form__input-wrapper">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.requiredPass, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Hasło"
          hint="At least 8 characters"
          counter
          outlined
          rounded
          @click:append="show1 = !show1"
        ></v-text-field>
      </div>

      <!-- <div class="form__input-wrapper">
            <v-text-field v-model="mail" label="e-mail" required></v-text-field>
        </div> -->
      <!-- <div class="form__input-wrapper">
            <v-text-field v-model="password" label="hasło" required></v-text-field>
        </div> -->
      <my-button
        color="#20CE99"
        fontColor="white"
        @click.native="loginek(login, password)"
        >Zaloguj</my-button
      >
    </div>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    show1: false,
    login: '',
    password: '',
    rules: {
      requiredLogin: value => !!value || 'Login jest wymagany.',
      requiredPass: value => !!value || 'Hasło jest wymagane.',
      min: v => v.length >= 8 || 'Min 8 characters'
    }
  }),
  methods: {
    ...mapMutations(['AUTHENTICATE_USER']),
    loginek(login, password) {
      apiService
        .login(login, password)
        .then(res => {
          sessionStorage.setItem('ROLE', `${res.data.roles[0]}`)
          sessionStorage.setItem('isAuthenticated', true)
          this.$router.push({ path: '/' })
          this.$store.commit('AUTHENTICATE_USER', true)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss">
.login-wrapper {
  width: 500px;
  height: 400px;
  background: white;
  position: fixed;
  top: calc(50% - 250px);
  left: calc(50% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
</style>
