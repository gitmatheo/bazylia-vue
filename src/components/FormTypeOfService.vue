<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2 class="title">Wybierz typ badań</h2>
    <v-radio-group
      class="radio-wrapper"
      row
      justify-center
      v-model="rodzajBadan"
      @click="select(rodzajBadan)"
    >
      <v-radio
        color="#20CE99"
        label="Wstępne"
        :value="rodzajBadanConst.WSTEPNE"
        checked
      ></v-radio>
      <v-radio
        color="#20CE99"
        label="Okresowe"
        :value="rodzajBadanConst.OKRESOWE"
      ></v-radio>
      <v-radio
        color="#20CE99"
        label="Kontrolne"
        :value="rodzajBadanConst.KONTROLNE"
      ></v-radio>
      <v-radio
        color="#20CE99"
        label="Celowe"
        :value="rodzajBadanConst.CELOWE"
      ></v-radio>
      <v-radio
        color="#20CE99"
        label="Końcowe"
        :value="rodzajBadanConst.KONCOWE"
      ></v-radio>
      <v-radio
        color="#20CE99"
        label="Sanitarno-epidemiologiczne"
        :value="rodzajBadanConst.SANITARNO_EPIDEMIOLOGICZNE"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { rodzajBadanConst } from '@/constants/constants'

export default {
  data() {
    return {
      rodzajBadan: null,
      rodzajBadanConst: rodzajBadanConst,
      wybranaWizyta: null
    }
  },
  methods: {
    ...mapMutations(['UPDATE_RODZAJ_BADAN']),
    updateRodzajBadan(rodzajBadan) {
      this.UPDATE_RODZAJ_BADAN(rodzajBadan)
    },
    select(rodzajBadan) {
      this.updateRodzajBadan(rodzajBadan)
    }
  }
}
</script>

<style lang="scss">
.title {
  margin: 50px 0px;
}
</style>
