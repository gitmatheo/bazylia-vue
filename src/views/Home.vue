<template>
  <v-container>
    <SearchPatient :getPatients="getPatients"></SearchPatient>
    <ListOfPatients :patients="patients" :deletePatient="deletePatient" :register="register"></ListOfPatients>
  </v-container>
</template>

<script>
import SearchPatient from "../components/SearchPatient";
import ListOfPatients from "../components/ListOfPatients";

export default {
  components: {
    SearchPatient,
    ListOfPatients
  },
  data: () => ({
    patients: []
  }),
  methods: {
    getPatients() {
      this.patients = this.$store.getters.getPatients;
    },
    deletePatient(index) {
      console.log(index);
      const { name, secondName } = this.patients[index];
      const confirmation = confirm(
        `Jesteś pewny/a, że chcesz usunać pacjenta:
         ${name} ${secondName} ?`
      );
      if (confirmation) {
        return this.$delete(this.patients, index);
      }
    },

    register(index) {
      const { name, secondName, company, pesel } = this.patients[index];
      confirm(`Chcesz zarejestrować tego użytkownika ? 
      Imię: ${name}
      Nazwisko: ${secondName}
      Firma: ${company}
      PESEL: ${pesel}`);
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
