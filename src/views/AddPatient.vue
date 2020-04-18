<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
      <h2 class="headline">Dodaj Pacjenta</h2>

      <v-form v-model="valid">
        <v-layout class="form__container">
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.imie"
              label="Imię"
              :rules="nameRules"
              :counter="5"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.nazwisko"
              label="Nazwisko"
              :rules="secondNameRules"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.pesel"
              label="PESEL"
              :rules="peselRules"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.numerKarty"
              label="Numer Karty"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.ulica"
              label="Ulica"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.miasto"
              label="Miasto"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.kodPocztowy"
              label="Kod-Pocztowy"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.numerTelefonu"
              label="Numer Telefonu"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.nip"
              label="NIP"
              placeholder="xxx-xxx-xx-xx"
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.stanowisko"
              label="Stanowisko"
              required
            ></v-text-field>
          </div>
        </v-layout>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <my-button
          fontColor="white"
          color="#20CE99"
          @click.native="submitPatient(pacjent)"
          >Dodaj Pacjenta</my-button
        >

        <PatientAddedPopup
          :open="dialog2"
          :patient="pacjent"
          @onClose="dialog2 = false"
        ></PatientAddedPopup>
      </v-card-actions>
    </div>
  </v-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import apiService from '@/services/apiService.js'
import PatientAddedPopup from '@/components/PatientAddedPopup'

export default {
  components: {
    PatientAddedPopup
  },
  data: () => ({
    valid: false,
    dialog2: false,
    pacjent: {
      pacjentId: '', //uuid
      imie: '',
      nazwisko: '',
      pesel: '',
      numerKarty: '',
      ulica: '',
      miasto: '',
      kodPocztowy: '',
      numerTelefonu: '',
      nip: '',
      stanowisko: '',
      dataOrzeczenia: null
    },
    fromDateMenu: false,
    nameRules: [v => !!v || 'Imię jest wymagane'],
    secondNameRules: [v => !!v || 'Nazwisko jest wymagane'],
    peselRules: [v => !!v || 'PESEL jest wymagany']
  }),
  computed: {
    fromDateDisp() {
      return this.fromDateVal
      // format date, apply validations, etc. Example below.
      // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
    },
    nipFormatted() {
      return this.pacjent.nip.replace(/-/g, '')
    }
  },
  methods: {
    ...mapMutations(['ADD_PATIENT', 'UPDATE_PATIENT_FOR_REGISTRATION']),
    ...mapActions(['addPatient']),
    submitPatient(patient) {
      apiService.submitPatient(patient).then(res => {
        const pacjentId = res.headers.location.match(
          /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
        )[0]
        patient.pacjentId = pacjentId
        this.$store.commit('UPDATE_PATIENT_FOR_REGISTRATION', patient)
        this.dialog2 = true
      })
    }
  }
}
</script>

<style lang="scss">
.form {
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 5%;
  }
  &__input-wrapper {
    margin: 0px;
  }
}
</style>
