<template>
  <v-container grid-list-md text-xs-center>
    <v-stepper v-model="currentStepNumber" >
      <v-stepper-header>
        <v-stepper-step :complete="currentStepNumber > 1" step="1">Typ badań</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 2" step="2">Firma</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 3" step="3">Data i godzina</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStepNumber > 4" step="4">Usługa</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="5">Podsumowanie</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <FormTypeOfService />
          <div class="btns">
            <my-button text fontColor="black" color="white" to="/">Wróć</my-button>
            <my-button
              fontColor="white"
              color="#20CE99"
              @click.native="currentStepNumber = 2"
              :disabled="wizyta.rodzajBadan.length == 0"
            >Dalej</my-button>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <FormCompany />
          <div class="btns">
            <my-button text fontColor="black" color="white" @click.native="currentStepNumber = 1">Wróć</my-button>
            <my-button fontColor="white" color="#20CE99" @click.native="currentStepNumber = 3"
            :disabled="!wizyta.pacjent.firma">{{wizyta.pacjent.firma ? "Dalej" : "Nie wybrano firmy"}}</my-button>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <FormDatePicker title="Medycyna pracy" />
          <div class="btns">
            <my-button text fontColor="black" color="white" @click.native="currentStepNumber = 2">Wróć</my-button>
            <my-button  fontColor="white" color="#20CE99" @click.native="currentStepNumber = 4"
            >Dalej</my-button>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <FormUsluga title="Medycyna pracy" />
          <div class="btns">
            <my-button text fontColor="black" color="white" @click.native="currentStepNumber = 3">Wróć</my-button>
            <my-button fontColor="white" color="#20CE99"
              @click.native="currentStepNumber = 5"
              :disabled="wizyta.usluga.nazwa.length == 0"
            >Dalej</my-button>
          </div>
        </v-stepper-content>

        <v-stepper-content step="5">
          <FormSummary :typeOfSummary="typWizytyConst.MEDYCYNA_PRACY" title="Medycyna pracy" />
          <div class="btns">
            <my-button text fontColor="black" color="white" @click.native="currentStepNumber = 4">Wróć</my-button>
            <my-button
              fontColor="white" color="#20CE99"
              @click.native="zarejestrujWizyte"
              :disabled="zarejestrowano"
            >{{zarejestrowano ? "Zarejestrowano wizytę" : "Zarejestruj wizytę"}}</my-button>
          </div>
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
import MyButton from "../components/MyButton";

export default {
  components: {
    FormTypeOfService,
    FormCompany,
    FormDatePicker,
    FormSummary,
    FormUsluga,
    MyButton
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

/* .v-stepper__step .v-stepper__step--active */

.v-stepper__header {
  width: 80%;
  margin-top:25px !important;
  margin: 0 auto;
  box-shadow: none;
}

.v-stepper__step.v-stepper__step--active {
  .v-stepper__step__step.primary {
    background:black!important;
    border: 1px solid black!important;
    color: white!important;
  }
}

.v-stepper__step {
  .v-stepper__step__step {
    background:white!important;
    border: 1px solid grey!important;
    color: grey!important;
  }
}

.btns {
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin: 0 auto;
};

</style>
