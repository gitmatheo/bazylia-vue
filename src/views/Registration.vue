<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text class="display-1 px-0">Rejestracja Pacjenta</v-card-text>
          <ul class="patient-list">
            <li>Imię: {{patientForReg.name}}</li>
            <li>Nazwisko: {{patientForReg.secondName}}</li>
            <li>Firma: {{patientForReg.company}}</li>
            <li>PESEL: {{patientForReg.pesel}}</li>
          </ul>
        </v-card>
        <v-card>
          <v-card-text class="display-1">Rodzaj Wizyty</v-card-text>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn color="error" class="custom-btn" large>
                <router-link to="/medycyna-pracy">Medycyna Pracy</router-link>
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn color="error" class="custom-btn" large>
                <router-link to="/specjalistyka">Specjalistyka</router-link>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { mapState } from "vuex";
export default {
  data: () => ({
    patientForReg: {}
  }),
  mounted: function() {
    this.patientForReg = this.$store.getters.getPatientForReg;
  }
  // showPatientForReg() {
  //   console.log("hii mounted");
  //   console.log(this.$store.getters.getPatientForReg);
  //   this.patientForReg = this.$store.getters.getPatientForReg;
  // }
};
</script>

<style lang="scss">
.patient-list {
  list-style: none;
  text-align: left;
  font-size: 1.2rem;
  padding: 25px;
}

.custom-btn {
  width: calc(100% - 50px);
  a {
    color: white;
  }
}
</style>
