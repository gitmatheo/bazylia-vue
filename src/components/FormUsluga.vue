<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Wybierz usługę </h3>
    <v-form v-model="valid" lazy-validation>
        <v-container>
            <v-layout>
                <v-flex xs3>
                    <v-text-field v-model="nazwaUslugi" label="Nazwa uslugi"></v-text-field>
                </v-flex>
                <v-flex xs3>
                <v-btn :disabled="!valid" color="info">
                    <span>Szukaj</span>
                    <v-icon right>search</v-icon>
                </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
    <ul>
        <li v-for="(usluga, i) in filteredUslugi" :key="i" @click="wybierzUsluge(usluga)">
            <span>Nazwa usługi:{{usluga.nazwa}}</span> --- <span>Cena:{{usluga.cenaZwykla}}</span>
        </li>
    </ul>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapMutations } from "vuex";

export default {
  data: () => ({
    patientForReg: {},
    uslugi: [],
    nazwaUslugi: ""
  }),
  mounted: function() {
    this.patientForReg = this.$store.getters.getPatientForReg;
    axios.get("http://10.3.68.238:8080/uslugi")
        .then(res => this.uslugi = res.data)
        .catch(err => console.log(err))
  },
  computed: {
    filteredUslugi() {
      return this.uslugi.filter(usluga => usluga.nazwa.match(this.nazwaUslugi) );
    }
  },
  methods: {
      ...mapMutations(["UPDATE_USLUGA"]),
      wybierzUsluge(usluga) {
          console.log("Usluga id")
          console.log(usluga)

          this.UPDATE_USLUGA(usluga);

      }
  }
};
</script>

<style lang="scss">
ul {
  li {
    list-style: none;
    text-align: left;
  }
}
</style>
