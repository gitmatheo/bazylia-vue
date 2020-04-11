<template>
  <v-container grid-list-md text-xs-center>
    <v-stepper v-model="currentStepNumber">
      <v-stepper-header>
        <v-stepper-step :complete="currentStepNumber > 1" step="1"
          >Typ badań</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 2" step="2"
          >Firma</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 3" step="3"
          >Data i godzina</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 4" step="4"
          >Usługa</v-stepper-step
        >
        <v-divider></v-divider>

        <v-stepper-step step="5">Podsumowanie</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <FormTypeOfService />
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
              @click.native="currentStepNumber = 2"
              :disabled="wizyta.rodzajBadan.length == 0"
              >Dalej</my-button
            >
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <FormCompany />
          <div class="btns">
            <my-button
              text
              fontColor="black"
              color="white"
              data-cy="back-button-step2"
              @click.native="currentStepNumber = 1"
              >Wróć</my-button
            >
            <my-button
              fontColor="white"
              color="#20CE99"
              data-cy="next-button-step2"
              @click.native="currentStepNumber = 3"
              :disabled="!wizyta.pacjent.firma"
              >{{
                wizyta.pacjent.firma ? 'Dalej' : 'Nie wybrano firmy'
              }}</my-button
            >
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <FormDatePicker title="Medycyna pracy" />
          <div class="btns">
            <my-button
              text
              fontColor="black"
              color="white"
              data-cy="back-button-step3"
              @click.native="currentStepNumber = 2"
              >Wróć</my-button
            >
            <my-button
              fontColor="white"
              color="#20CE99"
              data-cy="next-button-step3"
              @click.native="currentStepNumber = 4"
              >Dalej</my-button
            >
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <FormUsluga title="Medycyna pracy" />
          <div class="btns">
            <my-button
              text
              fontColor="black"
              color="white"
              data-cy="back-button-step4"
              @click.native="currentStepNumber = 3"
              >Wróć</my-button
            >
            <my-button
              fontColor="white"
              color="#20CE99"
              data-cy="next-button-step4"
              @click.native="currentStepNumber = 5"
              :disabled="wizyta.usluga.nazwa.length == 0"
              >Dalej</my-button
            >
          </div>
        </v-stepper-content>

        <v-stepper-content step="5">
          <FormSummary
            :typeOfSummary="typWizytyConst.MEDYCYNA_PRACY"
            title="Medycyna pracy"
          />
          <div class="btns">
            <my-button
              class="btns__button"
              fontColor="black"
              color="white"
              data-cy="back-button-step5"
              @click.native="currentStepNumber = 4"
              >Wróć</my-button
            >
            <my-button
              fontColor="white"
              class="btns__button"
              color="#20CE99"
              data-cy="next-button-step5"
              @click.native="zarejestrujWizyte(wizyta)"
              :disabled="zarejestrowano"
              >{{
                zarejestrowano ? 'Zarejestrowano wizytę' : 'Zarejestruj wizytę'
              }}</my-button
            >
          </div>
          <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Rejestruję wizytę
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <!-- <pre><code>{{wizyta}}</code></pre> -->
  </v-container>
</template>

<script>
import FormTypeOfService from '../components/FormTypeOfService'
import FormCompany from '../components/FormCompany'
import FormDatePicker from '../components/FormDatePicker'
import FormSummary from '../components/FormSummary'
import FormUsluga from '../components/FormUsluga'
import { typWizytyConst } from '../constants/constants'
import apiService from '@/services/apiService.js'

export default {
  components: {
    FormTypeOfService,
    FormCompany,
    FormDatePicker,
    FormSummary,
    FormUsluga
  },
  data() {
    return {
      currentStepNumber: 1,
      editable: true,
      length: 5,
      zarejestrowano: false,
      dialog: false,
      typWizytyConst: typWizytyConst,
      wizyta: {
        wizytaId: '',
        pacjent: {
          pacjentId: '',
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
        typWizyty: 'MEDYCYNA_PRACY',
        rodzajBadan: '',
        dataWizyty: '',
        usluga: {
          uslugaId: '',
          nazwa: '',
          cenaZwykla: null,
          cenaUmowa: null,
          cenaRabat: null
        },
        faktura: ''
      }
    }
  },
  methods: {
    zarejestrujWizyte(wizyta) {
      this.dialog = true
      apiService.registerVisit(wizyta)
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'UPDATE_PATIENT_FOR_REGISTRATION') {
        this.wizyta.pacjent = state.wizyta.pacjent
      }
      if (mutation.type === 'UPDATE_TYP_WIZYTY') {
        this.wizyta.typWizyty = state.wizyta.typWizyty
      }
      if (mutation.type === 'UPDATE_RODZAJ_BADAN') {
        this.wizyta.rodzajBadan = state.wizyta.rodzajBadan
      }
      if (mutation.type === 'UPDATE_DATE_AND_TIME') {
        this.wizyta.dataWizyty = state.wizyta.dataWizyty
      }
      if (mutation.type === 'UPDATE_PATIENT_COMPANY') {
        this.wizyta.firma = state.wizyta.firma
      }
      if (mutation.type === 'UPDATE_USLUGA') {
        this.wizyta.usluga = state.wizyta.usluga
      }
    })

    this.wizyta = this.$store.getters.getWizyta
  }
}
</script>

<style lang="scss">
.btns {
  display: flex;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
}
</style>
