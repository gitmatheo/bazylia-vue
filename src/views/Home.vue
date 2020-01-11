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

import ListOfPatients from "../components/ListOfPatients";
import { mapMutations } from "vuex";
import API from "../constants/api";
import axios from 'axios';

export default {
  components: {
    ListOfPatients
  },
  data: () => ({
    patients: [
      {
        pacjentId: "ca798f3c-fd0c-4e59-a675-170de7a03290",
        imie: "Bogdan",
        nazwisko: "Brzęczyszczykiewicz",
        pesel: "56121202345",
        numerKarty: "12345",
        ulica: "Bogdanowa 234/4",
        miasto: "Warszawa",
        kodPocztowy: "00.020",
        numerTelefonu: "756345746",
        nip: "723-34-567-65",
        firma: {
          firmaId: "9aba4d00-d551-4dfe-9df0-551e8312a7d3",
          nazwa: "Mc Donald's",
          ulica: "Armii Krajowej 123",
          miasto: "Zgierz",
          kodPocztowy: "95-100",
          regon: "15002900",
          umowa: true,
          rabat: 0,
      },
      stanowisko: "pracownik biurowy",
      dataOrzeczenia: null
      }
    ],
    valid: false,
    name: "",
    secondName: "",
    pesel: ""
  }),
  computed: {
    filteredPatients: function() {
      return this.patients.filter(patient => {
        return (
          patient.imie.match(this.name) &&
          patient.nazwisko.match(this.nazwisko) &&
          patient.pesel.match(this.pesel)
        );
      });
    }
  },

  methods: {
    ...mapMutations(["UPDATE_PATIENT_FOR_REGISTRATION", "GET_ALL_PATIENTS_FROM_DB"]),
    setPatientForReg(patientForReg) {
      this.UPDATE_PATIENT_FOR_REGISTRATION(patientForReg);
    },
    getFilteresPatients() {
      this.patients = this.$store.getters.getPatients;
    },
    getPatients() {
      this.name = "";
      this.secondName = "";
      this.pesel = "";

      axios.get(`${API.url}/pacjenci`, {
        params: {
          pageNumber: 1,
          pageSize: 50,
          order: "ASC"
        }
      })
      .then( (response) => {
          this.$store.commit('GET_ALL_PATIENTS_FROM_DB', response.data);
          this.patients = this.$store.getters.getPatients;
        })
      .catch(function (error) {
          console.log(error);
        });

    },
    getFilteredPatients() {
      this.patients = this.$store.getters.getPatients.filter(patient => {
        return patient.name.match(this.name);
      });
    },
    deletePatient(index) {
      const { imie, nazwisko } = this.patients[index];
      const confirmed = confirm(
        `Jesteś pewny/a, że chcesz usunać pacjenta:
         ${imie} ${nazwisko} ?`
      );
      if (confirmed) {
        const pacjentId = this.patients[index].pacjentId;
        axios.delete(`${API.url}/pacjenci/${pacjentId}`)
        return this.$delete(this.patients, index);
      }
    },

    register(index) {
      const {
        pacjentId,
        imie,
        nazwisko,
        pesel,
        numerKarty,
        ulica,
        miasto,
        kodPocztowy,
        numerTelefonu,
        nip,
        firma,
        stanowisko,
        dataOrzeczenia,
      } = this.patients[index];
      const patientForReg = {
        pacjentId,
        imie,
        nazwisko,
        pesel,
        numerKarty,
        ulica,
        miasto,
        kodPocztowy,
        numerTelefonu,
        nip,
        firma,
        stanowisko,
        dataOrzeczenia,
      };
      this.setPatientForReg(patientForReg);
      const confirmed = confirm(`Chcesz zarejestrować tego pacjenta ?
      Imię: ${imie}
      Nazwisko: ${nazwisko}
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
