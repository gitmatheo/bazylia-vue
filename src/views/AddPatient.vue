<template>
  <v-layout class="search-form" row justify-center>
    <v-card my-4 class="elevation-15">
      <v-card-title>
        <span class="headline">Dodaj Pacjenta</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="pacjent.imie" label="Imię" :rules="nameRules" :counter="5" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="pacjent.nazwisko" label="Nazwisko" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="pacjent.pesel" label="Pesel" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="pacjent.numerKarty" label="Numer Karty" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="pacjent.ulica" label="Ulica" required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="pacjent.miasto" label="Miasto" required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="pacjent.kodPocztowy" label="Kod-Pocztowy" required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="pacjent.numerTelefonu" label="Numer Telefonu" required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="pacjent.nip" label="NIP" placeholder="xxx-xxx-xx-xx" required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="pacjent.stanowisko" label="Stanowisko" required></v-text-field>
              </v-flex>
              <!-- Input with datepicker -->
              <v-flex xs6>
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
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <pre><code>{{pacjent}}</code></pre>
        <h2>nipFormatted</h2>
        <pre><code>{{nipFormatted}}</code></pre>
        <h2>nip</h2>
        <pre><code>{{pacjent.nip}}</code></pre>
        <!-- <v-btn color="success" @click.native="dialog = false">Dodaj Pacjenta</v-btn> -->
        <v-btn color="success" @click="submitPatient(pacjent)">Dodaj Pacjenta</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
// import uuidv1 from 'uuid/v1';
// const uuidv1 = require('uuid/v1');
import { mapMutations, mapActions } from 'vuex';
import API from "../constants/api";
import axios from 'axios';

export default {
  components: {
    // DialogBox,
    // ListOfCompanies,
    // AddCompany
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
    nameRules: [
        v => !!v || 'Imię jest wymagane',
      ],
    }),
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
      // format date, apply validations, etc. Example below.
      // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
    },
    nipFormatted() {
      return this.pacjent.nip.replace(/-/g,'');
    },
  },
  methods: {
    ...mapMutations(['ADD_PATIENT']),
    ...mapActions(["addPatient"]),
    submitPatient(payload) {
      console.log(payload);
      console.log(this.pacjent);
      console.log("helo")
      axios.post(`${API.url}/pacjenci`, this.pacjent)
      .then(function (response) {
        this.ADD_PATIENT(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>

<style>
</style>
