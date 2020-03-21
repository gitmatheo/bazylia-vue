<template>
  <v-container>
    <!-- <SearchPatient :getPatients="getPatients" :name="name" :secondName="secondName" :pesel="pesel"></SearchPatient> -->

    <v-layout row justify-center>
      <v-flex xs12 class="search-form white">
        <h2>
          Wyszukaj Pacjenta
          <span class="subtitle">(wpisz nazwisko lub pesel)</span>
        </h2>

        <v-form class="form" v-model="valid" lazy-validation>
          <v-layout row justify-space-between>
            <!-- <v-flex xs12 md3>
              <v-text-field
                v-model="name"
                @change="updatevisiblePatients"
                label="Imię"
              ></v-text-field>
            </v-flex> -->
            <div class="form__input-wrapper flex  md4 xs12 pr-2">
              <v-text-field
                v-model="nazwisko"
                @input="updatevisiblePatients"
                label="Nazwisko"
              />
            </div>
            <v-spacer></v-spacer>
            <div class="form__input-wrapper flex  md4 xs12 px-2">
              <v-text-field
                v-model="pesel"
                @input="updatevisiblePatients"
                label="PESEL"
              />
            </div>
            <!-- <div class="form__input-wrapper flex xs12 md4">
              <button class="my-btn" :disabled="!valid">
                <span>Szukaj</span>
                <v-icon right>search</v-icon>
              </button>
            </div> -->
            <v-spacer></v-spacer>
            <div class="form__input-wrapper flex xs12 md4 pl-2">
              <my-button
                color="success"
                fontColor="white"
                @click.native="getPatients"
              >
                Pokaż wszystkich pacjentów
              </my-button>
            </div>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
    <ListOfPatients
      :isLoading="isLoading"
      :filteredPatients="filteredPatients"
      :visiblePatients="visiblePatients"
      @onDeletePatient="deletePatient($event)"
    ></ListOfPatients>

    <div class="pagination">
      <v-pagination
        v-model="currentPage"
        :page="currentPage + 1"
        :length="patients.length / pageSize"
        @click.native="updatevisiblePatients"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import ListOfPatients from '../components/ListOfPatients'
import { mapMutations } from 'vuex'
import apiService from '@/services/apiService.js'

export default {
  components: {
    ListOfPatients
  },
  data: () => ({
    isLoading: false,
    currentPage: 1,
    pageSize: 10,
    visiblePatients: [],
    patients: [
      // {
      //   pacjentId: ,
      //   imie: 'Bogdan',
      //   nazwisko: 'Brzęczyszczykiewicz',
      //   pesel: '56121202345',
      //   numerKarty: '12345',
      //   ulica: 'Bogdanowa 234/4',
      //   miasto: 'Warszawa',
      //   kodPocztowy: '00.020',
      //   numerTelefonu: '756345746',
      //   nip: '723-34-567-65',
      //   firma: {
      //     firmaId: '9aba4d00-d551-4dfe-9df0-551e8312a7d3',
      //     nazwa: "Mc Donald's",
      //     ulica: 'Armii Krajowej 123',
      //     miasto: 'Zgierz',
      //     kodPocztowy: '95-100',
      //     regon: '15002900',
      //     umowa: true,
      //     rabat: 0
      //   },
      //   stanowisko: 'pracownik biurowy',
      //   dataOrzeczenia: null
      // }
    ],
    valid: false,
    name: '',
    nazwisko: '',
    pesel: ''
  }),
  computed: {
    filteredPatients: function() {
      return this.patients.filter(patient => {
        return (
          // patient.imie.toLowerCase().match(this.name.toLowerCase()) &&
          patient.nazwisko.toLowerCase().match(this.nazwisko.toLowerCase()) &&
          patient.pesel.toLowerCase().match(this.pesel.toLowerCase())
        )
      })
    },
    filteredvisiblePatients: function() {
      return this.visiblePatients.filter(patient => {
        return (
          // patient.imie.toLowerCase().match(this.imie.toLowerCase()) &&
          patient.nazwisko
            .toLowerCase()
            .toString()
            .match(this.nazwisko.toLowerCase()) &&
          patient.pesel
            .toLowerCase()
            .toString()
            .match(this.pesel.toLowerCase())
        )
      })
    }
  },

  methods: {
    ...mapMutations(['GET_ALL_PATIENTS_FROM_DB']),
    getPatients() {
      this.isLoading = true
      apiService
        .getPatients()
        .then(response => {
          this.$store.commit('GET_ALL_PATIENTS_FROM_DB', response.data)
          this.patients = this.$store.getters.getPatients
          this.updatevisiblePatients()
          this.isLoading = false
        })
        .catch(function(error) {
          console.error(error)
        })
    },

    updatePage(pageNumber) {
      this.currentPage = pageNumber
      this.updatevisiblePatients()
    },

    updatevisiblePatients() {
      let begin = this.currentPage * this.pageSize - this.pageSize
      let end = begin + this.pageSize
      this.visiblePatients = this.filteredPatients.slice(begin, end) //
      if (this.visiblePatients.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },
    getFilteredPatients() {
      this.patients = this.$store.getters.getPatients.filter(patient => {
        return patient.name.match(this.name)
      })
    },
    deletePatient(patient) {
      apiService.deletePatient(patient.pacjentId).then(() => {
        // console.log('siemanko z delete patient')
      })
      // return this.$delete(this.patients, index)
    }
  }
}
</script>

<style lang="scss">
.search-form {
  padding: 30px 130px;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 10px 0 20px 0;
    .subtitle {
      font-size: 14px;
      font-weight: normal;
    }
  }
}

.my-btn {
  background-color: #20ce99;
  color: white;
  height: 48px;
  /* width: fit-content; */
  width: 100%;
  padding: 0 30px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  i {
    color: white !important;
  }

  &--black {
    background-color: black;
  }
}

.form {
  &__input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 50px;
      width: 100%;
      height: 48px;
      padding: 20px;
      outline: none;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  background: white;
  padding: 20px 0 40px;
  .v-pagination__navigation,
  .v-pagination__item {
    box-shadow: none;
    outline: none;
  }
}
</style>
