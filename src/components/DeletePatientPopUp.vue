<template>
  <div class="text-xs-center">
    <my-button @click.native="dialog = true" color="error">
      <slot></slot>
    </my-button>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title
          >Czy napewno chcesz usunąć pacjenta?</v-card-title
        >
        <v-divider></v-divider>
        <v-card-actions class="actions">
          <v-spacer></v-spacer>
          <my-button
            fontColor="white"
            color="#F44336"
            @click.native="deletePatient(patient)"
            >Usuń Pacjenta</my-button
          >
          <my-button
            fontColor="black"
            color="white"
            @click.native="dialog = false"
            >Anuluj</my-button
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
        })
        .then(() => console.log('oopsie'))
      //prop drilling. probably there is a better way
      this.$emit('onDeletePatient', patient)
    }
  }
}
</script>

<style lang="scss"></style>
