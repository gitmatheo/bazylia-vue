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
              required
            ></v-text-field>
          </div>
          <div class="form__input-wrapper">
            <v-text-field
              v-model="pacjent.pesel"
              label="Pesel"
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
          <!-- Input with datepicker -->
          <div class="form__input-wrapper">
            <v-menu
              v-model="fromDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Data orzeczenia"
                  prepend-icon="event"
                  readonly
                  :value="pacjent.dataOrzeczenia"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="en-in"
                v-model="pacjent.dataOrzeczenia"
                no-title
                @input="fromDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-layout>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <pre><code>{{pacjent}}</code></pre>
        <h2>nipFormatted</h2>
        <pre><code>{{nipFormatted}}</code></pre>
        <h2>nip</h2>
        <pre><code>{{pacjent.nip}}</code></pre>-->
        <!-- <v-btn color="success" @click.native="dialog = false">Dodaj Pacjenta</v-btn> -->
        <my-button
          fontColor="white"
          color="#20CE99"
          @click.native="submitPatient()"
          >Dodaj Pacjenta</my-button
        >
      </v-card-actions>
    </div>
  </v-container>
</template>

<script>
// import uuidv1 from 'uuid/v1';
// const uuidv1 = require('uuid/v1');
import { mapMutations, mapActions } from 'vuex'
import API from '../constants/api'
import axios from 'axios'
import MyButton from '../components/MyButton'
export default {
  components: {
    // DialogBox,
    // ListOfCompanies,
    // AddCompany,
    MyButton
  },
  data: () => ({
    valid: false,
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
    nameRules: [v => !!v || 'Imię jest wymagane']
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
    ...mapMutations(['ADD_PATIENT']),
    ...mapActions(['addPatient']),
    submitPatient() {
      axios
        .post(`${API.url}/pacjenci`, this.pacjent)
        .then(function(response) {
          this.ADD_PATIENT(response)
        })
        .catch(function(error) {
          console.error(error)
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
    /* display: flex;
    align-items: center;
    justify-content: center; */
    margin: 0px;
  }
}

/* .v-input__slot {
  
  height: 48px!important;

  input{
  height: 48px!important;
  }

} */
</style>
