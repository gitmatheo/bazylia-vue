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
          <v-layout>
            <!-- <v-flex xs12 md3>
              <v-text-field
                v-model="name"
                @change="getFilteredPatients"
                label="Imię"
              ></v-text-field>
            </v-flex> -->
            <div class="form__input-wrapper flex xs12 md4">
              <input
                v-model="nazwisko"
                @change="getFilteredPatients"
                placeholder="Nazwisko"
                label="Nazwisko"
              />
            </div>
            <div class="form__input-wrapper flex xs12 md4">
              <input
                v-model="pesel"
                @change="getFilteredPatients"
                placeholder="Pesel"
                label="PESEL"
              />
            </div>
            <div class="form__input-wrapper flex xs12 md4">
              <button class="my-btn" :disabled="!valid">
                <span>Szukaj</span>
                <v-icon right>search</v-icon>
              </button>
            </div>
          </v-layout>
          <button class="my-btn my-btn--black" @click.prevent="getPatients">
            Pokaż wszystkich pacjentów
          </button>
        </v-form>
      </v-flex>
    </v-layout>
    <ListOfPatients
      :patients="patients"
      :isLoading="isLoading"
      :filteredPatients="filteredPatients"
      @onDeletePatient="deletePatient($event)"
    ></ListOfPatients>
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
          patient.imie.toLowerCase().match(this.name.toLowerCase()) &&
          patient.nazwisko.toLowerCase().match(this.nazwisko.toLowerCase()) &&
          patient.pesel.toLowerCase().match(this.pesel.toLowerCase())
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
          this.isLoading = false
        })
        .catch(function(error) {
          console.error(error)
        })
    },
    getFilteredPatients() {
      this.patients = this.$store.getters.getPatients.filter(patient => {
        return patient.name.match(this.name)
      })
    },
    deletePatient(index) {
      const pacjentId = this.patients[index].pacjentId
      apiService.deletePatient(pacjentId)
      return this.$delete(this.patients, index)
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
  width: 224px;
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

    button {
      align-self: flex-start;
    }
    /* &:nth-child(2) {
    margin-left: 32px;
  } */
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
</style>
