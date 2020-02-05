<template>
  <v-container grid-list-md text-xs-center>
    <v-stepper v-model="currentStepNumber">
      <v-stepper-header>
        <v-stepper-step :complete="currentStepNumber > 1" step="1">Wybierz typ badań</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 2" step="2">Wybierz firmę</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 3" step="3">Wybierz datę i godzinę</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 4" step="4">Wybierz usługę</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="5">Podsumowanie</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <FormTypeOfService />
          <v-btn text to="/registration">Wróć</v-btn>
          <v-btn
            @click="currentStepNumber = 2"
            :disabled="wizyta.rodzajBadan.length == 0"
          >Dalej</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <FormCompany />
          <v-btn text @click="currentStepNumber = 1">Wróć</v-btn>
          <v-btn  @click="currentStepNumber = 3"
          :disabled="!wizyta.pacjent.firma">{{wizyta.pacjent.firma ? "Dalej" : "Nie wybrano firmy"}}</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <FormDatePicker title="Medycyna pracy" />
          <v-btn text @click="currentStepNumber = 2">Wróć</v-btn>
          <v-btn  @click="currentStepNumber = 4"
          >Dalej</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <FormUsluga title="Medycyna pracy" />
          <v-btn text @click="currentStepNumber = 3">Wróć</v-btn>
          <v-btn
            @click="currentStepNumber = 5"
            :disabled="wizyta.usluga.nazwa.length == 0"
          >Dalej</v-btn>
        </v-stepper-content>

        <v-stepper-content step="5">
          <FormSummary :typeOfSummary="typWizytyConst.MEDYCYNA_PRACY" title="Medycyna pracy" />
          <v-btn text @click="currentStepNumber = 4">Wróć</v-btn>
          <v-btn
            @click="zarejestrujWizyte"
            :disabled="zarejestrowano"
          >{{zarejestrowano ? "Zarejestrowano wizytę" : "Zarejestruj wizytę"}}</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <pre><code>{{wizyta}}</code></pre>
  </v-container>
</template>

<script>
import FormTypeOfService from '../components/FormTypeOfService';
import FormCompany from '../components/FormCompany';
import FormDatePicker from '../components/FormDatePicker';
import FormSummary from '../components/FormSummary';
import FormUsluga from '../components/FormUsluga';
import API from '../constants/api';
import { typWizytyConst } from '../constants/constants';
import axios from 'axios';

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
    };
  },
  methods: {
    zarejestrujWizyte() {
      this.zarejestrowano = true;
      axios
        .post(`${API.url}/wizyty`, this.wizyta)
        .then(() => this.$router.push({ path: '/' }))
        .catch(err => console.error(err));
    }
  },
  mounted() {
    this.wizyta = this.$store.getters.getWizyta;
  }
};
</script>

<style lang="scss">
</style>
