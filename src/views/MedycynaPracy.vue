<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap class="white rounded" my-5 elevation-10>
      <v-flex xs12>
        <FormTypeOfService v-if="currentStepNumber === 1" @update="updateTypeOfService"/>
        <FormCompany v-if="currentStepNumber === 2" @update="updateCompany"/>
        <FormDatePicker v-if="currentStepNumber === 3" @update="updateDate"/>
        <FormUsluga v-if="currentStepNumber === 4" />
        <FormSummary v-if="currentStepNumber === 5" />
        <span>Krok: {{currentStepNumber}}/5</span>
        <div class="progress-bar">
          <div :style="`width: ${progress}%`"></div>
        </div>
        <div class="buttons">
          <v-btn @click="goBack" v-if="currentStepNumber > 1" color="disabled">Wstecz</v-btn>
          <v-btn @click="goNext" v-if="currentStepNumber < 5" color="success">Dalej</v-btn>
          <v-btn @click="zarejestrujWizyte" v-if="currentStepNumber == 5" color="success">Zarejestruj</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <pre><code>{{wizyta}}</code></pre>
  </v-container>
</template>

<script>
import FormTypeOfService from "../components/FormTypeOfService";
import FormCompany from "../components/FormCompany";
import FormDatePicker from "../components/FormDatePicker";
import FormSummary from "../components/FormSummary";
import FormUsluga from "../components/FormUsluga";
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
      length: 5,
      wizyta:{
        wizytaId: '',
        pacjent: {
          pacjentId: "",
          imie: "",
          nazwisko: "",
          pesel: "",
          numerKarty: "",
          ulica: "",
          miasto: "",
          kodPocztowy: "",
          numerTelefonu: "",
          nip: "",
          stanowisko: "",
          dataOrzeczenia: null
        },
        typWizyty: 'medycyna-pracy',
        rodzajBadan: '',
        dataWizyty: '',
        usluga: {
          uslugaId: "",
          nazwa: "",
          cenaZwykla: null,
          cenaUmowa: null,
          cenaRabat: null
        },
        faktura: ''
      },
    };
  },
  computed: {
    progress() {
      return (this.currentStepNumber / this.length) * 100;
    }
  },
  methods: {
    updateTypeOfService(typWizyty) {
      Object.assign(this.wizyta, typWizyty);
    },
    updateCompany(firmaPacjenta) {
      Object.assign(this.wizyta.pacjent, firmaPacjenta)
    },
    updateDate(dataWizyty) {
      Object.assign(this.dataWizyty, dataWizyty)
    },
    goBack() {
      this.currentStepNumber--;
    },
    goNext() {
      this.currentStepNumber++;
    },
    zarejestrujWizyte() {
      axios.post("http://10.3.68.238:8080/wizyty", this.wizyta)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
  },
  mounted() {
    this.wizyta = this.$store.getters.getWizyta;
  },
  updated() {
    console.log("Hllo from updated")
    console.log(this.currentStepNumber)
    console.log(this.length)
    console.log(this.progress)
  }
};
</script>

<style lang="scss">
.rounded {
  border-radius: 5px;
}

.progress-bar {
  width: 100%;
  height: 20px;
  border-radius: 5px 10px 10px 5px;
  background: lighten(grey, 45);
  /* border: 1px solid lighten(grey, 35); */

  div {
    background: #1976d2;
    border-radius: 5px 10px 10px 5px;
    height: 90%;
    transform: translateY(5%);
    transition: 0.6s all;
  }
}
</style>
