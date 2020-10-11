<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 class="search-form white">
        <h2>
          Wyszukaj Pacjenta
          <span class="subtitle">(wpisz nazwisko lub pesel)</span>
        </h2>

        <v-form class="form" v-model="valid" lazy-validation>
          <v-layout row justify-space-between>
            <div class="form__input-wrapper flex md4 xs12 pr-2">
              <v-text-field
                v-model="name"
                data-cy="name"
                @input="updatevisiblePatients"
                label="Imię"
              ></v-text-field>
            </div>
            <v-spacer></v-spacer>
            <div class="form__input-wrapper flex md4 xs12 pr-2">
              <v-text-field
                v-model="nazwisko"
                data-cy="surname"
                @input="updatevisiblePatients"
                label="Nazwisko"
              />
            </div>
            <v-spacer></v-spacer>
            <div class="form__input-wrapper flex md4 xs12 px-2">
              <v-text-field
                v-model="pesel"
                data-cy="pesel"
                @input="updatevisiblePatients"
                label="PESEL"
              />
            </div>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
    <ListOfPatients
      :isLoading="isLoading"
      :filteredPatients="filteredPatients"
      :visiblePatients="visiblePatients"
    ></ListOfPatients>
    <div class="pagination">
      <v-pagination
        v-if="filteredPatients.length"
        v-model="currentPage"
        :page="currentPage"
        :length="
          Math.floor(
            filteredPatients.length % pageSize == 0
              ? filteredPatients.length / pageSize
              : filteredPatients.length / pageSize + 1
          )
        "
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
    patients: [],
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
    },
    filteredvisiblePatients: function() {
      return this.visiblePatients.filter(patient => {
        return (
          patient.imie
            .toLowerCase()
            .toString()
            .match(this.imie.toLowerCase()) &&
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
      apiService.getPatients().then(response => {
        this.$store.commit('GET_ALL_PATIENTS_FROM_DB', response.data)
        this.patients = this.$store.getters.getPatients
        this.updatevisiblePatients()
        this.isLoading = false
      })
    },

    updatevisiblePatients() {
      let begin = this.currentPage * this.pageSize - this.pageSize
      let end = begin + this.pageSize
      this.visiblePatients = this.filteredPatients.slice(begin, end)
    },
    getFilteredPatients() {
      this.patients = this.$store.getters.getPatients.filter(patient => {
        return patient.name.match(this.name)
      })
    }
  },
  created() {
    this.getPatients()
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'DELETE_PATIENT') {
        this.patients = state.patients
        this.updatevisiblePatients()
      }
    })
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
</style>
