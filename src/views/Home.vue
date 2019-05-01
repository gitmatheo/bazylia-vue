<template>
  <v-container>
    <!-- <SearchPatient :getPatients="getPatients" :name="name" :secondName="secondName" :pesel="pesel"></SearchPatient> -->

    <v-layout row justify-center>
      <v-flex xs12 class="search-form white" elevation-5>
        <h2>Wyszukaj Pacjenta</h2>

        <v-form v-model="valid" lazy-validation>
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field v-model="name" @change="getFilteresPatients" label="Imię"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field v-model="secondName" @change="getFilteresPatients" label="Nazwisko"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="pesel"
                  :rules="peselRules"
                  @change="getFilteresPatients"
                  label="PESEL"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn :disabled="!valid" color="success">
            <span>Szukaj</span>
            <v-icon right>search</v-icon>
          </v-btn>
          <v-btn color="error" class="white--text" @click="getPatients">Pokaż wszystkich pacjentów</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <ListOfPatients
      :patients="patients"
      :deletePatient="deletePatient"
      :filteredPatients="filteredPatients"
      :register="register"
    ></ListOfPatients>
  </v-container>
</template>

<script>
// import SearchPatient from "../components/SearchPatient";
import ListOfPatients from "../components/ListOfPatients";
import { mapMutations } from "vuex";

export default {
  components: {
    // SearchPatient,
    ListOfPatients
  },
  data: () => ({
    patients: [],
    valid: false,
    name: "",
    secondName: "",
    pesel: ""
  }),
  computed: {
    filteredPatients: function() {
      return this.patients.filter(patient => {
        return (
          patient.name.match(this.name) &&
          patient.secondName.match(this.secondName) &&
          patient.pesel.match(this.pesel)
        );
      });
    }
  },

  methods: {
    ...mapMutations(["SET_PATIENT_FOR_REGISTRATION"]),
    setPatientForReg(patientForReg) {
      this.SET_PATIENT_FOR_REGISTRATION(patientForReg);
    },
    getFilteresPatients() {
      this.patients = this.$store.getters.getPatients;
    },
    getPatients() {
      this.name = "";
      this.secondName = "";
      this.pesel = "";
      this.patients = this.$store.getters.getPatients;
    },
    getFilteredPatients() {
      console.log("Eelo");
      this.patients = this.$store.getters.getPatients.filter(patient => {
        return patient.name.match(this.name);
      });
    },
    deletePatient(index) {
      console.log(index);
      const { name, secondName } = this.patients[index];
      const confirmed = confirm(
        `Jesteś pewny/a, że chcesz usunać pacjenta:
         ${name} ${secondName} ?`
      );
      if (confirmed) {
        return this.$delete(this.patients, index);
      }
    },

    register(index) {
      const {
        id,
        company,
        name,
        secondName,
        pesel,
        serviceName,
        invoice
      } = this.patients[index];
      const patientForReg = {
        id,
        company,
        name,
        secondName,
        pesel,
        serviceName,
        invoice
      };
      this.setPatientForReg(patientForReg);
      const confirmed = confirm(`Chcesz zarejestrować tego użytkownika ?
      Imię: ${name}
      Nazwisko: ${secondName}
      Firma: ${company}
      PESEL: ${pesel}`);

      if (confirmed) {
        this.$router.push({ path: "/registration" });
      }
    }
  }
};
</script>

<style lang="scss">
.search-form {
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 10px 0 20px 0;
  }
}
</style>
