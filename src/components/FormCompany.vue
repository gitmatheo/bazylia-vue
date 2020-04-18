<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Wybierz firmę</h3>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-radio-group
          justify-center
          v-model="selection"
          @click="select(selection)"
        >
          <v-radio label="Użyj Firmy / ostatnio wybrana" :value="1"></v-radio>
          <v-radio label="Użyj firmy z bazy danych" :value="2"></v-radio>
          <v-radio label="Dodaj firmę" :value="3"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs6>
        <h3>
          {{ wizyta.pacjent.firma ? 'Wybrana firma' : 'Nie wybrano firmy' }}
        </h3>
        <ul v-if="wizyta.pacjent.firma" class="company-desc">
          <li>
            Nazwa:
            <span class="font-weight-medium font-italic">{{
              wizyta.pacjent.firma.nazwa
            }}</span>
          </li>
          <li>
            Ulica:
            <span class="font-weight-medium font-italic">{{
              wizyta.pacjent.firma.ulica
            }}</span>
          </li>
          <li>
            Miasto:
            <span class="font-weight-medium font-italic">{{
              wizyta.pacjent.firma.miasto
            }}</span>
          </li>
          <li>
            Kod-Pocztowy:
            <span class="font-weight-medium font-italic">{{
              wizyta.pacjent.firma.kodPocztowy
            }}</span>
          </li>
          <li>
            NIP:
            <span class="font-weight-medium font-italic">{{
              wizyta.pacjent.firma.nip
            }}</span>
          </li>
          <li v-if="wizyta.pacjent.firma.ryczalt">
            Ryczałt:
            <span class="font-weight-medium font-italic">{{
              wizyta.pacjent.firma.ryczalt
            }}</span>
          </li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <v-layout v-if="selection == 2" row justify-center>
          <v-flex xs12>
            <h2 class="headline">Wybierz firmę z bazy</h2>
            <div class="company__search-wrapper">
              <div class="form__input-wrapper">
                <v-text-field
                  v-model="nameSearch"
                  @input="updateVisibleCompanies"
                  label="Nazwa Firmy"
                ></v-text-field>
              </div>
              <div class="form__input-wrapper">
                <v-text-field
                  v-model="NIPSearch"
                  @input="updateVisibleCompanies"
                  label="nip"
                ></v-text-field>
              </div>
            </div>
            <v-expansion-panels flat>
              <v-expansion-panel flat v-if="visibleCompanies" my-2>
                <v-expansion-panel-content
                  v-for="(firma, i) in visibleCompanies"
                  :key="i"
                >
                  <template v-slot:header>
                    <div class="company__header">
                      <div>{{ firma.nazwa }}</div>
                      <div>{{ firma.ulica }}</div>
                      <div>NIP: {{ firma.nip }}</div>
                    </div>
                    Szczegóły
                  </template>
                  <v-card>
                    <ul ref="patient" class="company__desc">
                      <li>Nazwa: {{ firma.nazwa }}</li>
                      <li>Ulica: {{ firma.ulica }}</li>
                      <li>Miasto: {{ firma.miasto }}</li>
                      <li>Kod-pocztowy: {{ firma.kodPocztowy }}</li>
                      <li>NIP: {{ firma.nip }}</li>
                      <li>Ryczałt: {{ firma.ryczalt }}</li>
                    </ul>
                    <my-button color="success" @click.native="selectCompany(i)"
                      >Wybierz firmę</my-button
                    >
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <div class="pagination">
              <v-pagination
                v-model="currentPage"
                :page="currentPage + 1"
                :length="companies.length / pageSize + 1"
                @click.native="updateVisibleCompanies"
              ></v-pagination>
            </div>
          </v-flex>
        </v-layout>

        <v-form v-if="selection == 3" v-model="isFormValid">
          <h2 class="headline">Dodaj Firmę</h2>
          <v-layout class="form__container">
            <div class="form__input-wrapper">
              <v-text-field
                label="Nazwa Firmy"
                :rules="rules.name"
                v-model="companyToAdd.nazwa"
              ></v-text-field>
            </div>
            <div class="form__input-wrapper">
              <v-text-field
                label="Ulica"
                :rules="rules.street"
                v-model="companyToAdd.ulica"
              ></v-text-field>
            </div>
            <div class="form__input-wrapper">
              <v-text-field
                label="Miasto"
                :rules="rules.city"
                v-model="companyToAdd.miasto"
              ></v-text-field>
            </div>
            <div class="form__input-wrapper">
              <v-text-field
                label="Kod-Pocztowy"
                :rules="rules.zipCode"
                v-model="companyToAdd.kodPocztowy"
              ></v-text-field>
            </div>

            <div class="form__input-wrapper">
              <v-text-field
                v-model="companyToAdd.nip"
                label="NIP"
                :rules="rules.nip"
                placeholder="xxx-xxx-xx-xx"
                required
              ></v-text-field>
            </div>

            <div class="form__input-wrapper">
              <v-text-field
                v-model="companyToAdd.email"
                :rules="rules.email"
                label="E-mail"
              ></v-text-field>
            </div>

            <div class="form__input-wrapper">
              <v-text-field
                type="number"
                label="Ryczałt"
                v-model="companyToAdd.ryczalt"
              ></v-text-field>
            </div>
            <v-flex xs12>
              <my-button
                color="success"
                :disabled="!isFormValid"
                @click.native="addNewCompany(companyToAdd)"
                >Dodaj Firmę</my-button
              >
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    currentPage: 1,
    pageSize: 10,
    visibleCompanies: [],
    companies: [],
    companyToAdd: {
      firmaId: '',
      nazwa: '',
      ulica: '',
      miasto: '',
      kodPocztowy: '',
      nip: '',
      email: '',
      ryczalt: 0
    },
    firma: {},
    selection: 1,
    selectedCompany: null,
    nameSearch: '',
    NIPSearch: '',
    isFormValid: true,
    wizyta: {
      pacjent: {
        firma: ''
      }
    },
    rules: {
      name: [v => !!v || 'Nazwa firmy jest wymagana'],
      street: [v => !!v || 'Ulica jest wymagana'],
      city: [v => !!v || 'Miasto jest wymagane'],
      zipCode: [v => !!v || 'Kod-pocztowy jest wymagany'],
      nip: [v => !!v || 'NIP jest wymagany'],
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Niepoprawny e-mail'
      }
    }
  }),
  methods: {
    ...mapMutations(['ADD_COMPANY', 'UPDATE_PATIENT_COMPANY']),

    getCompany(id) {
      apiService.getCompany(id).then(res => {
        this.wizyta.pacjent.firma = res.data
      })
    },

    select(selection) {
      if (selection == 2) {
        apiService.getCompanies().then(response => {
          this.$store.commit('GET_ALL_COMPANIES_FROM_DB', response.data)
          this.companies = this.$store.getters.getCompanies
          this.updateVisibleCompanies()
        })
      }
      this.selectedCompany = selection
    },

    updatePage(pageNumber) {
      this.currentPage = pageNumber
      this.updateVisibleCompanies()
    },
    updateVisibleCompanies() {
      let begin = this.currentPage * this.pageSize - this.pageSize
      let end = begin + this.pageSize
      this.visibleCompanies = this.filteredCompanies.slice(begin, end) //
      if (this.visibleCompanies.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },

    selectCompany(index) {
      this.wizyta.pacjent.firma = { ...this.visibleCompanies[index] }
      this.UPDATE_PATIENT_COMPANY(this.wizyta.pacjent.firma)
    },

    addNewCompany(company) {
      apiService.addCompany(company).then(response => {
        const firmaId = response.headers.location.match(
          /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
        )[0]
        this.getCompany(firmaId)
      })
    }
  },

  mounted: function() {
    this.companies = this.$store.getters.getCompanies
    this.wizyta = this.$store.getters.getWizyta
  },
  computed: {
    filteredCompanies: function() {
      return this.companies.filter(firma => {
        return (
          firma.nazwa.toLowerCase().match(this.nameSearch.toLowerCase()) &&
          firma.nip
            .toLowerCase()
            .toString()
            .match(this.NIPSearch.toLowerCase())
        )
      })
    },
    filteredVisibleCompanies: function() {
      return this.visibleCompanies.filter(firma => {
        return (
          firma.nazwa.toLowerCase().match(this.nameSearch.toLowerCase()) &&
          firma.nip
            .toLowerCase()
            .toString()
            .match(this.NIPSearch.toLowerCase())
        )
      })
    },
    ryczalt() {
      return this.companyToAdd.ryczalt.toFixed(2)
    }
  }
}
</script>

<style lang="scss">
.company-desc {
  text-align: left;
}

.company {
  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  &__search-wrapper {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    grid-gap: 25px;
    width: 65%;
  }

  &__desc {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 16px;
    line-height: 26px;
  }
}

.form {
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 5%;
  }
  &__input-wrapper {
    margin: 0px;
  }
}
</style>
