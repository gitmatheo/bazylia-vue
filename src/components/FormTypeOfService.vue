<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Wybierz typ badań</h3>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-radio-group row justify-center v-model="rodzajBadan" @click="select(rodzajBadan)">
          <v-radio label="Wstępne" color="error" :value="rodzajBadanConst.WSTEPNE" checked></v-radio>
          <v-radio label="Okresowe" color="error" :value="rodzajBadanConst.OKRESOWE"></v-radio>
          <v-radio
            label="Sanitarno-epidemiologiczne"
            color="error"
            :value="rodzajBadanConst.SANITARNO_EPIDEMIOLOGICZNE"
          ></v-radio>
          <v-radio label="Kontrolne" color="error" :value="rodzajBadanConst.KONTROLNE"></v-radio>
        </v-radio-group>
        <span>Wybrano: {{rodzajBadan}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import rodzajBadanConst from '../constants/constants';

export default {
  data() {
    return {
      rodzajBadan: null,
      rodzajBadanConst: rodzajBadanConst,
      wybranaWizyta: null
    };
  },
  methods: {
    ...mapMutations(["UPDATE_RODZAJ_BADAN"]),
    updateRodzajBadan(rodzajBadan) {
      console.log("Rodzaj badan")
      console.log(rodzajBadan);
      this.UPDATE_RODZAJ_BADAN(rodzajBadan);
    },
    select(rodzajBadan) {
      this.updateRodzajBadan(rodzajBadan);

      // this.wybranaWizyta = rodzajBadan;
      // this.$emit("update", {
      //   rodzajBadan: this.wybranaWizyta
      // });
    },
  },
  mounted: function() {
    console.log("siema rodzaj badan const")
    console.log(this.rodzajBadanConst);
  }
};
</script>

<style>
</style>
