<template>
  <v-container>
    <SearchPatient :getPatients="getPatients"></SearchPatient>
    <ListOfPatients :patients="patients" :deletePatient="deletePatient" :register="register"></ListOfPatients>
  </v-container>
</template>

<script>
import SearchPatient from "../components/SearchPatient";
import ListOfPatients from "../components/ListOfPatients";
import { mapMutations } from "vuex";

export default {
  components: {
    SearchPatient,
    ListOfPatients
  },
  data: () => ({
    patients: []
  }),
  methods: {
    ...mapMutations(["SET_PATIENT_FOR_REGISTRATION"]),
    setPatientForReg(patientForReg) {
      this.SET_PATIENT_FOR_REGISTRATION(patientForReg);
    },
    getPatients() {
      this.patients = this.$store.getters.getPatients;
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
