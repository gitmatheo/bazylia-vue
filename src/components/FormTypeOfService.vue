<template>
  <v-container grid-list-md text-xs-center class="white">

    <div class="service-info">
      Imie i nazwisko: Bogdan Brzęczyszczykiewicz, PESEL: 323151132, Rodzaj badań: Medycyna Pracy
    </div>
    <h2>Wybierz typ badań</h2>
      <v-radio-group class="wrapper" row justify-center v-model="rodzajBadan" @click="select(rodzajBadan)">
        <v-radio color="#20CE99" label="Wstępne" :value="rodzajBadanConst.WSTEPNE" checked></v-radio>
        <v-radio color="#20CE99" label="Okresowe" :value="rodzajBadanConst.OKRESOWE"></v-radio>
        <v-radio
          color="#20CE99"
          label="Sanitarno-epidemiologiczne"
          :value="rodzajBadanConst.SANITARNO_EPIDEMIOLOGICZNE"
        ></v-radio>
        <v-radio color="#20CE99" label="Kontrolne" :value="rodzajBadanConst.KONTROLNE"></v-radio>
      </v-radio-group>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { rodzajBadanConst } from '../constants/constants';

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
      this.UPDATE_RODZAJ_BADAN(rodzajBadan);
    },
    select(rodzajBadan) {
      this.updateRodzajBadan(rodzajBadan);
    },
  },

};
</script>

<style lang="scss">

h2 {
  margin:50px 0px;
}

.service-info {
  box-shadow: 0px 2px 5px rgba(34, 34, 34, 0.2);
  border-radius: 10px;
  padding:20px 30px;
  width: fit-content;
  margin: 0 auto;

}

.wrapper {
  display:flex;
  justify-content: space-evenly;

  .v-input__control{
    display:block;
    width: 70%;

    .v-input__slot {
      display: block;
      /* background: yellowgreen; */
      .v-input--radio-group__input{
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

</style>
