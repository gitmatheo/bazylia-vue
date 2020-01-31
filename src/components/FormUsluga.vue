<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - {{title}}</h2>
    <h3>Wybierz usługę</h3>
    <v-form v-model="valid" lazy-validation>
      <v-container>
        <v-layout>
          <v-flex xs3>
            <v-text-field v-model="nazwaUslugi" label="Nazwa uslugi"></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-btn :disabled="!valid">
              <span>Szukaj</span>
              <v-icon right>search</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

    <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="(usluga, i) in filteredUslugi"
        :key="i"
        :label="`${usluga.nazwa} Cena:${usluga.cenaZwykla}`"
        :value="usluga"
        @click.native="wybierzUsluge(usluga)"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import API from '../constants/api';

export default {
  props: ['title'],
  data: () => ({
    radioGroup: [],
    patientForReg: {},
    uslugi: [],
    nazwaUslugi: '',
    valid: false
  }),
  mounted: function() {
    this.patientForReg = this.$store.getters.getPatientForReg;
    axios
      .get(`${API.url}/uslugi`)
      .then(res => (this.uslugi = res.data))
      .catch(err => console.error(err));
  },
  computed: {
    filteredUslugi() {
      return this.uslugi.filter(usluga => usluga.nazwa.match(this.nazwaUslugi));
    }
  },
  methods: {
    ...mapMutations(['UPDATE_USLUGA']),
    wybierzUsluge(usluga) {
      this.UPDATE_USLUGA(usluga);
    }
  }
};
</script>

<style lang="scss">
.usluga {
  list-style: none;
  text-align: left;
  cursor: pointer;
}
</style>
