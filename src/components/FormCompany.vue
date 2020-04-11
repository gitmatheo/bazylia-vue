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
            Regon:
            <span class="font-weight-medium font-italic">{{
              wizyta.pacjent.firma.regon
            }}</span>
          </li>
          <li>
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
            <v-form v-model="valid" lazy-validation>
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
                    v-model="REGONSearch"
                    @input="updateVisibleCompanies"
                    label="regon"
                  ></v-text-field>
                </div>
                <v-flex xs3>
                  <my-button
                    :disabled="!valid"
                    color="success"
                    @click.native="updateVisibleCompanies"
                  >
                    <span>Szukaj</span>
                    <v-icon right>search</v-icon>
                  </my-button>
                </v-flex>
              </div>
            </v-form>
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
                      <div>regon: {{ firma.regon }}</div>
                    </div>
                    Szczegóły
                  </template>
                  <v-card>
                    <ul ref="patient" class="company__desc">
                      <li>Nazwa: {{ firma.nazwa }}</li>
                      <li>Ulica: {{ firma.ulica }}</li>
                      <li>Miasto: {{ firma.miasto }}</li>
                      <li>Kod-pocztowy: {{ firma.kodPocztowy }}</li>
                      <li>Regon: {{ firma.regon }}</li>
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

        <v-form v-if="selection == 3" v-model="valid">
          <h2 class="headline">Dodaj Firmę</h2>
          <v-layout class="form__container">
            <div class="form__input-wrapper">
              <v-text-field
                label="Nazwa Firmy"
                v-model="companyToAdd.nazwa"
              ></v-text-field>
            </div>
            <div class="form__input-wrapper">
              <v-text-field
                label="Ulica"
                v-model="companyToAdd.ulica"
              ></v-text-field>
            </div>
            <div class="form__input-wrapper">
              <v-text-field
                label="Miasto"
                v-model="companyToAdd.miasto"
              ></v-text-field>
            </div>
            <div class="form__input-wrapper">
              <v-text-field
                label="Kod-Pocztowy"
                v-model="companyToAdd.kodPocztowy"
              ></v-text-field>
            </div>

            <div class="form__input-wrapper">
              <v-text-field
                label="regon"
                type="number"
                v-model="companyToAdd.regon"
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
                @click.native="addNewCompany(companyToAdd)"
                >Dodaj Firmę</my-button
              >
            </v-flex>
          </v-layout>

          <!-- <h2>companyToAdd</h2>
          <pre><code>{{companyToAdd}}</code></pre>
          <h2>firma</h2>
          <pre><code>{{wizyta}}</code></pre> -->
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
      regon: '',
      umowa: false,
      ryczalt: 0
    },
    firma: {},
    selection: 1,
    selectedCompany: null,
    nameSearch: '',
    REGONSearch: '',
    valid: true,
    wizyta: {
      pacjent: {
        firma: ''
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
          firma.regon
            .toLowerCase()
            .toString()
            .match(this.REGONSearch.toLowerCase())
        )
      })
    },
    filteredVisibleCompanies: function() {
      return this.visibleCompanies.filter(firma => {
        return (
          firma.nazwa.toLowerCase().match(this.nameSearch.toLowerCase()) &&
          firma.regon
            .toLowerCase()
            .toString()
            .match(this.REGONSearch.toLowerCase())
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
