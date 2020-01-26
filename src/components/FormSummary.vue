<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - {{title}}</h2>
    <h4>Podsumowanie Rejestracji</h4>

    <v-layout v-if="typeOfSummary == typWizytyConst.MEDYCYNA_PRACY" row wrap justify-center>
      <v-flex xs6>
        <h3>Pacjent</h3>
        <ul class="patient-list">
          <li>Imię: {{wizyta.pacjent.imie}}</li>
          <li>Nazwisko: {{wizyta.pacjent.nazwisko}}</li>
          <li>PESEL: {{wizyta.pacjent.pesel}}</li>
        </ul>
      </v-flex>
      <v-flex xs6 sm6>
        <h3>Firma</h3>
        <ul>
          <li>Nazwa: {{wizyta.pacjent.firma.nazwa}}</li>
          <li>Ulica: {{wizyta.pacjent.firma.ulica}}</li>
          <li>Miasto: {{wizyta.pacjent.firma.miasto}}</li>
          <li>Kod-pocztowy: {{wizyta.pacjent.firma.kodPocztowy}}</li>
          <li>REGON: {{wizyta.pacjent.firma.regon}}</li>
          <li>Ryczałt: {{wizyta.pacjent.firma.ryczalt}}</li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <h3>Usługa</h3>
        <ul>
          <li>Nazwa usługi: {{wizyta.usluga.nazwa}}</li>
          <li>Cena: {{wizyta.usluga.cenaZwykla}}</li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <h3>Godzina i data wizyty</h3>
        <ul>
          <li>Data: {{date | moment("MM-DD-YYYY")}}</li>
          <li>Godzina: {{date | moment("HH:mm")}}</li>
        </ul>
      </v-flex>
    </v-layout>

    <v-layout v-if="typeOfSummary == typWizytyConst.SPECJALISTYKA" row wrap justify-center>
      <v-flex xs12>
        <h3>Pacjent</h3>
        <ul class="patient-list">
          <li>Imię: {{wizyta.pacjent.imie}}</li>
          <li>Nazwisko: {{wizyta.pacjent.nazwisko}}</li>
          <li>PESEL: {{wizyta.pacjent.pesel}}</li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <h3>Usługa</h3>
        <ul>
          <li>Nazwa usługi: {{wizyta.usluga.nazwa}}</li>
          <li>Cena: {{wizyta.usluga.cenaZwykla}}</li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <h3>Godzina i data wizyty</h3>
        <ul>
          <li>Data: {{date | moment("MM-DD-YYYY")}}</li>
          <li>Godzina: {{date | moment("HH:mm")}}</li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { typWizytyConst } from '../constants/constants';

export default {
  props: ['typeOfSummary', 'title'],
  data: () => ({
    wizyta: {},
    date: '',
    typWizytyConst: typWizytyConst
  }),

  computed: {
    data() {
      return this.date.getDate();
    }
  },
  created() {
    this.wizyta = this.$store.getters.getWizyta;
    this.date = new Date(this.wizyta.dataWizyty);
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'UPDATE_DATE_AND_TIME') {
        this.date = state.wizyta.dataWizyty;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
ul {
  li {
    list-style: none;
    text-align: left;
  }
}
h3 {
  text-align: left;
}
</style>
