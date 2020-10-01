<template>
  <div class="text-xs-center">
    <my-button @click.native="dialog = true" color="info">
      <slot></slot>
    </my-button>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-3" primary-title
          >Czy na pewno chcesz wysłać fakturę?
          <v-icon class="icon-close" right @click="dialog = false"
            >close</v-icon
          ></v-card-title
        >
        <v-card-text>
          <v-form v-model="valid" lazy-validation>
            <v-layout row justify-space-between>
              <div class="form__input-wrapper flex">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                ></v-text-field>
              </div>
            </v-layout>
          </v-form>

          <div>Faktura zostanie wysłana na adres: {{ email }}</div>
          <v-checkbox
            v-model="checkbox"
            label="Zaszyfrować plik?"
            @click="rootPass = null"
          ></v-checkbox>
          <v-form v-if="checkbox" @submit.prevent="sendMail(faktura.fakturaId)">
            <div class="form__input-wrapper flex">
              <v-text-field
                type="password"
                v-model="rootPass"
                placeholder="Podaj swój klucz szyfrujący"
              ></v-text-field>
            </div>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="actions">
          <v-spacer></v-spacer>
          <my-button
            fontColor="black"
            color="white"
            @click.native="dialog = false"
            >Anuluj</my-button
          >
          <my-button
            :disabled="!valid"
            fontColor="white"
            color="info"
            @click.native="sendMail(faktura.fakturaId)"
            >Wyślij
            <v-icon class="icon-close" right @click="dialog = false"
              >email</v-icon
            ></my-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSuccess" width="500">
      <v-card>
        <v-card-text>
          <div>
            <center>Faktura została wysłana!</center>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="actions">
          <v-spacer></v-spacer>
          <my-button
            fontColor="white"
            color="success"
            @click.native="dialogSuccess = false"
            >OK</my-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import apiService from '@/services/apiService.js'

export default {
  props: ['faktura'],
  data() {
    return {
      dialog: false,
      dialogSuccess: false,
      email: this.faktura.platnik.email,
      valid: false,
      checkbox: false,
      rootPass: null,
      rules: {
        required: value => !!value || 'Wpisz email.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Niepoprawny email'
        }
      }
    }
  },
  methods: {
    sendMail(fakturaId) {
      apiService
        .sendMail(fakturaId, { rootPass: this.rootPass, email: this.email })
        .then(() => {
          this.dialog = false
          this.dialogSuccess = true
        })
    }
  }
}
</script>
