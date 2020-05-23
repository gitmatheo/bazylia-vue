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
            Faktura zostanie wysłana na adres: {{ faktura.firma.email }}
          </div>
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
            @click.native="sendMail(faktura.fakturaId)"
            >Wyślij
            <v-icon class="icon-close" right @click="dialog = false"
              >email</v-icon
            ></my-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import apiService from '@/services/apiService.js'

export default {
  props: ['faktura', 'color'],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    sendMail(fakturaId) {
      this.loaderDialog = true
      apiService
        .sendMail(fakturaId)
        .then(() => {
          this.loaderDialog = false
          this.dialog = false
        });
    }
  }
}
</script>