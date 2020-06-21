<template>
  <v-container row justify-center>
    <div class="login-wrapper">
      <h1>Zaloguj się.</h1>
      <form @submit.prevent="handleSubmit(login, password)">
        <div class="form__input-wrapper">
          <v-text-field
            v-model="login"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.requiredLogin]"
            label="Login"
            outlined
            rounded
            data-cy="username"
            @click:append="show1 = !show1"
          ></v-text-field>
        </div>

        <div class="form__input-wrapper">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.requiredPass, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Hasło"
            outlined
            rounded
            data-cy="password"
            @click:append="show1 = !show1"
          ></v-text-field>
        </div>

        <my-button
          color="#20CE99"
          fontColor="white"
          data-cy="submit"
          type="submit"
          @click.native="handleSubmit(login, password)"
          >Zaloguj</my-button
        >
      </form>
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
      requiredPass: value => !!value || 'Hasło jest wymagane.'
    }
  }),
  methods: {
    ...mapMutations(['AUTHENTICATE_USER']),
    handleSubmit(login, password) {
      apiService.login(login, password).then(res => {
        localStorage.setItem('ROLE', `${res.data.roles[0]}`)
        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('username', res.data.username)
        this.$router.push({ path: '/' })
        this.$store.commit('AUTHENTICATE_USER', {
          isAuthenticated: true,
          username: res.data.username,
          role: res.data.roles[0]
        })
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
