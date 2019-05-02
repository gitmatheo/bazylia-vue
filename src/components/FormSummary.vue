<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Podsumowanie Rejestracji</h3>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <h2>Pacjent</h2>
        <ul class="patient-list">
          <li>Imię: {{patientForReg.name}}</li>
          <li>Nazwisko: {{patientForReg.secondName}}</li>
          <li>PESEL: {{patientForReg.pesel}}</li>
        </ul>
      </v-flex>
      <v-flex xs6 sm6>
        <h2>Firma</h2>
        <ul>
          <li>Nazwa: {{patientForReg.company.name}}</li>
          <li>Ulica: {{patientForReg.company.street}}</li>
          <li>Miasto: {{patientForReg.company.city}}</li>
          <li>Kod-pocztowy: {{patientForReg.company.postCode}}</li>
          <li>REGON: {{patientForReg.company.REGON}}</li>
          <li>NIP: {{patientForReg.company.NIP}}</li>
          <li>Ryczałt: {{patientForReg.company.ryczalt}}</li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <h2>Godzina i data wizyty</h2>
        <ul>
          <li>Data: {{patientForReg.date}}</li>
          <li>Godzina: {{patientForReg.time}}</li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    patientForReg: {}
  }),
  mounted: function() {
    this.patientForReg = this.$store.getters.getPatientForReg;
    console.log(this.patientForReg);
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
