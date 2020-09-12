<template>
  <!-- <div class="container"> -->
  <v-container>
    <!-- alt-labels -->
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" :editable="editable"
          >Wybierz datę i godzinę</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" :editable="editable"
          >Wybierz usługę</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="3">Podsumowanie</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <FormDatePicker title="Specjalistyka" />
          <div class="btns">
            <my-button
              text
              data-cy="back-button-step1"
              fontColor="black"
              color="white"
              to="/"
              >Wróć</my-button
            >
            <my-button
              fontColor="white"
              color="#20CE99"
              data-cy="next-button-step1"
              @click.native="e1 = 2"
              >Dalej</my-button
            >
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <FormUsluga type="specjalistyka" title="Specjalistyka" />

          <div class="btns">
            <my-button
              text
              data-cy="back-button-step1"
              fontColor="black"
              color="white"
              @click.native="e1 = 1"
              >Wróć</my-button
            >
            <my-button
              fontColor="white"
              color="#20CE99"
              data-cy="next-button-step1"
              @click.native="e1 = 3"
              >Dalej</my-button
            >
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <FormSummary
            :typeOfSummary="typWizytyConst.SPECJALISTYKA"
            title="Specjalistyka"
          />
          <div class="btns">
            <my-button
              text
              data-cy="back-button-step1"
              fontColor="black"
              color="white"
              @click.native="e1 = 2"
              >Wróć</my-button
            >
            <my-button
              fontColor="white"
              color="#20CE99"
              data-cy="next-button-step1"
              @click.native="zarejestrujWizyte(wizyta)"
              :disabled="zarejestrowano"
              >{{
                zarejestrowano ? 'Zarejestrowano wizytę' : 'Zarejestruj wizytę'
              }}</my-button
            >
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
  <!-- </div> -->
</template>

<script lang="typescript">
import FormDatePicker from '../components/FormDatePicker'
import FormUsluga from '../components/FormUsluga'
import FormSummary from '../components/FormSummary'
import { typWizytyConst } from '../constants/constants'
import apiService from '@/services/apiService.js'

export default {
  components: {
    FormDatePicker,
    FormUsluga,
    FormSummary
  },

  data() {
    return {
      zarejestrowano: false,
      wizyta: {},
      e1: 1,
      steps: 2,
      vertical: true,
      altLabels: false,
      editable: true,
      typWizytyConst: typWizytyConst
    }
  },
  methods: {
    onInput(val) {
      this.steps = parseInt(val)
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    },
    zarejestrujWizyte(wizyta) {
      apiService
        .registerVisit(wizyta)
    }
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'UPDATE_PATIENT_FOR_REGISTRATION') {
        this.wizyta.pacjent = state.wizyta.pacjent
      }
      if (mutation.type === 'UPDATE_DATE_AND_TIME') {
        this.wizyta.dataWizyty = state.wizyta.dataWizyty
      }
      if (mutation.type === 'UPDATE_USLUGA') {
        this.wizyta.usluga = state.wizyta.usluga
      }
    })
    this.wizyta = this.$store.getters.getWizyta
  }
}
</script>

<style lang="scss"></style>
