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
          <div>
            Faktura zostanie wysłana na adres: {{ faktura.platnik.email }}
          </div>
          <v-checkbox
                v-model="checkbox"
                label="Zaszyfrować plik?"
                ></v-checkbox>
           <v-form
           v-if="checkbox"
           @submit.prevent="sendMail(faktura.fakturaId, rootPass)">
                <v-text-field
                type='password'
                v-model='rootPass'
                placeholder='Podaj swój klucz szyfrujący'
                solo
               ></v-text-field>
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
            fontColor="white"
            color="info"
            @click.native="sendMail(faktura.fakturaId, rootPass)"
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
            fontColor="black"
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
  props: ['faktura', 'color', 'rootPass', 'checkbox'],
  data() {
    return {
      dialog: false,
      dialogSuccess: false
    }
  },
  methods: {
    sendMail(fakturaId, rootPass) {
      apiService.sendMail(fakturaId, rootPass).then(() => {
        this.dialog = false
        this.dialogSuccess = true
      })
    }
  }
}
</script>
