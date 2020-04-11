<template>
  <v-container grid-list-md text-xs-center class="white usluga">
    <h2>Rejestracja - {{ title }}</h2>
    <h3>Wybierz usługę</h3>
    <v-form v-model="valid" lazy-validation>
      <div class="usluga__search-wrapper">
        <div class="form__input-wrapper">
          <v-text-field
            v-model="nazwaUslugi"
            label="Nazwa uslugi"
          ></v-text-field>
        </div>

        <my-button
          class="usluga__button"
          color="success"
          :width="'90%'"
          :disabled="!valid"
        >
          <span>Szukaj</span>
          <v-icon right>search</v-icon>
        </my-button>
      </div>
    </v-form>

    <v-radio-group data-cy="lista-uslug" v-model="radioGroup">
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
import { mapMutations } from 'vuex'
import apiService from '@/services/apiService.js'

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
    this.patientForReg = this.$store.getters.getPatientForReg
    apiService.getUslugi().then(res => (this.uslugi = res.data))
  },
  computed: {
    filteredUslugi() {
      return this.uslugi.filter(usluga =>
        usluga.nazwa.toLowerCase().match(this.nazwaUslugi.toLowerCase())
      )
    }
  },
  methods: {
    ...mapMutations(['UPDATE_USLUGA']),
    wybierzUsluge(usluga) {
      this.UPDATE_USLUGA(usluga)
    }
  }
}
</script>

<style lang="scss">
.usluga {
  padding: 24px 60px;
  &__search-wrapper {
    width: 60%;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
  &__button {
    margin-top: 14px;
  }
}
</style>
