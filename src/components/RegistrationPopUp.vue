<template>
  <div class="text-xs-center">
    <my-button @click.native="dialog = true" color="success">
      Rejestruj wizyte
      <v-icon class="icon-close" right @click="dialog = false"
        >person_add</v-icon
      >
    </my-button>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-3" primary-title
          >Rejestracja pacjenta.
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
        <v-card-actions class="actions btns">
          <my-button
            color="#20CE99"
            :width="'49%'"
            fontColor="white"
            @click.native="
              onClickButton(typWizytyConst.MEDYCYNA_PRACY, patient)
            "
            to="/medycyna-pracy"
            >Medycyna Pracy</my-button
          >
          <my-button
            color="#20CE99"
            :width="'49%'"
            fontColor="white"
            @click.native="onClickButton(typWizytyConst.SPECJALISTYKA, patient)"
            to="/specjalistyka"
            >Specjalistyka</my-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { typWizytyConst } from '../constants/constants'
import { mapMutations } from 'vuex'

export default {
  props: ['patient'],
  data() {
    return {
      dialog: false,
      typWizytyConst: typWizytyConst
    }
  },
  methods: {
    ...mapMutations(['UPDATE_TYP_WIZYTY', 'UPDATE_PATIENT_FOR_REGISTRATION']),
    onClickButton(typWizyty, patient) {
      this.UPDATE_TYP_WIZYTY(typWizyty)
      this.UPDATE_PATIENT_FOR_REGISTRATION({ ...patient, firma: null })
    }
  }
}
</script>

<style lang="scss">
.headline {
  display: flex;
  justify-content: space-between;
  .icon-close {
    cursor: pointer;
  }
}
</style>
