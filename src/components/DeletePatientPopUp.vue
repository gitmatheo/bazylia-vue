<template>
  <div class="text-xs-center">
    <my-button @click.native="dialog = true" color="error">
      <slot></slot>
    </my-button>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-3" primary-title
          >Czy na pewno chcesz usunąć pacjenta?
          <v-icon class="icon-close" right @click="dialog = false"
            >close</v-icon
          ></v-card-title
        >
        <v-card-text>
          <div>Imię: {{ patient.imie }}</div>
          <div>Nazwisko: {{ patient.nazwisko }}</div>
          <div>PESEL: {{ patient.pesel }}</div>
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
            color="#F44336"
            @click.native="deletePatient(patient)"
            >Usuń Pacjenta
            <v-icon class="icon-close" right @click="dialog = false"
              >delete</v-icon
            ></my-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { typWizytyConst } from '../constants/constants'
import apiService from '@/services/apiService.js'

export default {
  props: ['patient', 'color'],
  data() {
    return {
      dialog: false,
      typWizytyConst: typWizytyConst
    }
  },
  methods: {
    deletePatient(patient) {
      this.loaderDialog = true
      apiService
        .deletePatient(patient.pacjentId)
        .then(() => {
          this.loaderDialog = false
          this.dialog = false
          this.$store.commit('DELETE_PATIENT', patient.pacjentId)
        })
        .then(() => console.log('oopsie'))
    }
  }
}
</script>

<style lang="scss"></style>
