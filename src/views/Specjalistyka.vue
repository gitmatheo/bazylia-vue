<template>
  <!-- <div class="container"> -->
  <v-container>
    <!-- alt-labels -->
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" :editable="editable">Wybierz datę i godzinę</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" :editable="editable">Wybierz usługę</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Podsumowanie</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <FormDatePicker title="Specjalistyka" />
          <v-btn text to="/registration">Wróć</v-btn>
          <v-btn @click="e1 = 2">Dalej</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <FormUsluga title="Specjalistyka" />

          <v-btn text @click="e1 = 1">Wróć</v-btn>
          <v-btn @click="e1 = 3">Dalej</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <FormSummary :typeOfSummary="typWizytyConst.SPECJALISTYKA" title="Specjalistyka" />

          <v-btn text @click="e1 = 2">Wróć</v-btn>
          <v-btn
            @click="zarejestrujWizyte"
            :disabled="zarejestrowano"
          >{{zarejestrowano ? "Zarejestrowano wizytę" : "Zarejestruj wizytę"}}</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <pre><code>{{wizyta}}</code></pre>
  </v-container>
  <!-- </div> -->
</template>

<script>
import FormDatePicker from '../components/FormDatePicker';
import FormUsluga from '../components/FormUsluga';
import FormSummary from '../components/FormSummary';
import { typWizytyConst } from '../constants/constants';
import API from '../constants/api';
import axios from 'axios';

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
    };
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
    vertical() {
      this.e1 = 2;
      requestAnimationFrame(() => (this.e1 = 1)); // Workarounds
    }
  },

  methods: {
    onInput(val) {
      this.steps = parseInt(val);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    zarejestrujWizyte() {
      this.zarejestrowano = true;
      axios
        .post(`${API.url}/wizyty`, this.wizyta)
        .then(() => this.$router.push({ path: '/' }))
        .catch(err => console.error(err));
    }
  },

  mounted: function() {
    this.wizyta = this.$store.getters.getWizyta;
  }
};
</script>

<style lang="scss">

</style>
