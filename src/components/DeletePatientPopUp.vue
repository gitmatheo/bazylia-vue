<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <!-- <my-button v-on="on">
          Rejestruj wizytę
        </my-button> -->
        <v-btn class="btnDelete" color="#F44336" v-on="on">
          <slot></slot>
        </v-btn>
      </template>
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
    <v-dialog v-model="loaderDialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Usuwam pacjenta
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
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
      loaderDialog: false,
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

<style lang="scss">
.btnDelete {
  display: flex !important ;
  justify-content: center !important;
  align-items: center !important;
  background-color: #20ce99;
  color: white !important;
  height: 48px !important;
  width: 224px !important;
  border-radius: 50px !important;
  margin: 20px 0px 20px !important;

  i {
    color: white !important; // dlaczego kurwa important ?;
  }

  &--black {
    background-color: black !important;
  }
  &--red {
    background-color: #f44336 !important; // dlaczego kurwa important ?;
  }
}

.v-dialog.v-dialog--active {
  border-radius: 10px;
}
.v-card__actions.actions {
  padding: 22px;
}
</style>
