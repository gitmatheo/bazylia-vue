<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
      <div class="szukajka">
        <v-menu
          v-model="dateMenu1"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <div class="form__input-wrapper flex pr-4">
              <v-text-field
                v-model="startDate"
                class="date-input"
                label="Data początkowa"
                readonly
                v-on="on"
              ></v-text-field>
            </div>
          </template>
          <v-date-picker
            v-model="startDate"
            no-title
            locale="pl-PL"
            @input="dateMenu1 = false"
          ></v-date-picker>
        </v-menu>

        <v-menu
          v-model="dateMenu2"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <div class="form__input-wrapper flex pr-4">
              <v-text-field
                v-model="endDate"
                class="date-input"
                label="Data końcowa"
                readonly
                v-on="on"
              ></v-text-field>
            </div>
          </template>
          <v-date-picker
            v-model="endDate"
            no-title
            locale="pl-PL"
            @input="dateMenu2 = false"
          ></v-date-picker>
        </v-menu>
        <my-button
          color="primary"
          fontColor="white"
          class="margin-top-2"
          @click.native="getWizytyByDate(startDate, endDate)"
          >Pobierz wizyty wg. daty</my-button
        >
      </div>

      <div v-if="!brakDanychMessage" class="visits-wrapper">
        <div class="title-wrapper">
          <h2>Zarejestrowane Wizyty</h2>

          <div class="typ-wizyty">
            <v-chip
              class="ma-2 chip"
              :class="selectedTypWizyty == '' ? 'chip--active' : 'chip'"
              @click="selectedTypWizyty = ''"
            >
              Wszystkie
            </v-chip>
            <v-chip
              class="ma-2"
              :class="
                selectedTypWizyty == 'MEDYCYNA_PRACY' ? 'chip--active' : 'chip'
              "
              @click="selectedTypWizyty = 'MEDYCYNA_PRACY'"
            >
              Medycyna-pracy
            </v-chip>
            <v-chip
              class="ma-2"
              :class="
                selectedTypWizyty == 'SPECJALISTYKA' ? 'chip--active' : 'chip'
              "
              @click="selectedTypWizyty = 'SPECJALISTYKA'"
            >
              Specjalistyka
            </v-chip>
          </div>

          <div
            v-if="wizyty && !isLoading"
            @click="getIncompleteVisits"
            class="orzeczenia"
          >
            Pacjenci do uzupełnienia
            <span class="counter-badge" :style="badgeStyles">
              {{ incompleteCounter }}</span
            >
          </div>
        </div>

        <Loader v-if="isLoading" />
        <v-card-text v-if="wizyty && !isLoading">
          <button
            v-if="!isAscending"
            class="sort-btn"
            @click="sortVisitsByDate('ascending')"
          >
            <v-icon> keyboard_arrow_up</v-icon>Sortuj od najstarszych
          </button>

          <button
            v-if="isAscending"
            class="sort-btn"
            @click="sortVisitsByDate()"
          >
            <v-icon> keyboard_arrow_down</v-icon>Sortuj od najnowszych
          </button>
          <v-expansion-panel my-2 class="patient elevation-0">
            <v-expansion-panel-content
              v-for="(wizyta, i) in visibleVisits"
              :key="i"
            >
              <template v-slot:header>
                <div class="wizyta__header">
                  <div class="col1">
                    {{ wizyta.dataWizyty | moment('DD-MM-YYYY') }}
                    -
                    {{ wizyta.pacjent.imie }}
                    {{ wizyta.pacjent.nazwisko }}
                    -
                    {{ wizyta.usluga.nazwa }}
                  </div>

                  <div class="col2">
                    <v-icon
                      v-if="
                        (wizyta.pacjent.decyzjaUpdated &&
                          wizyta.pacjent.dataOrzeczeniaUpdated) ||
                          wizyta.typWizyty == 'SPECJALISTYKA'
                      "
                      size="35px"
                      color="success"
                      >check</v-icon
                    >
                    <v-icon
                      v-if="
                        !(
                          (wizyta.pacjent.decyzjaUpdated &&
                            wizyta.pacjent.dataOrzeczeniaUpdated) ||
                          wizyta.typWizyty == 'SPECJALISTYKA'
                        )
                      "
                      size="35px"
                      color="error"
                      >error_outline</v-icon
                    >

                    <span>Szczegóły</span>
                  </div>
                </div>
              </template>
              <v-card>
                <div class="wizyta__details">
                  <div class="wizyta__details-col">
                    <h3>Pacjent</h3>
                    <ul>
                      <li>Imie: {{ wizyta.pacjent.imie }}</li>
                      <li>Nazwisko: {{ wizyta.pacjent.nazwisko }}</li>
                      <li>Pesel: {{ wizyta.pacjent.pesel }}</li>
                      <li>Telefon: {{ wizyta.pacjent.numerTelefonu }}</li>
                      <li>Numer karty: {{ wizyta.pacjent.numerKarty }}</li>
                      <li v-if="wizyta.typWizyty == 'MEDYCYNA_PRACY'">
                        Data orzeczenia:

                        <v-menu
                          v-model="wizyta.pacjent.dataOrzeczeniaMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="wizyta.pacjent.dataOrzeczenia"
                              class="date-input"
                              prepend-icon="event"
                              height="20px"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="wizyta.pacjent.dataOrzeczenia"
                            no-title
                            locale="pl-PL"
                            @input="
                              wizyta.pacjent.dataOrzeczeniaMenu = false
                              submitDataOrzeczenia(
                                wizyta.pacjent.pacjentId,
                                wizyta.pacjent.dataOrzeczenia
                              )
                            "
                          ></v-date-picker>
                        </v-menu>
                      </li>
                    </ul>
                  </div>
                  <div class="wizyta__details-col">
                    <h3>Usługa</h3>
                    <ul>
                      <li>Nazwa usługi: {{ wizyta.usluga.nazwa }}</li>
                      <li>Cena: {{ wizyta.usluga.cenaZwykla }}</li>
                      <li v-if="wizyta.typWizyty == 'MEDYCYNA_PRACY'">
                        Typ badań: {{ wizyta.rodzajBadan }}
                      </li>
                    </ul>
                  </div>
                  <div class="wizyta__details-col" v-if="wizyta.pacjent.firma">
                    <h3>Firma</h3>
                    <ul>
                      <li>Nazwa: {{ wizyta.pacjent.firma.nazwa }}</li>
                      <li>Ulica: {{ wizyta.pacjent.firma.ulica }}</li>
                      <li>Miasto: {{ wizyta.pacjent.firma.miasto }}</li>
                      <li>
                        Kod-pocztowy: {{ wizyta.pacjent.firma.kodPocztowy }}
                      </li>
                      <li>NIP: {{ wizyta.nip }}</li>
                    </ul>
                  </div>
                </div>
                <div v-if="wizyta.typWizyty == 'MEDYCYNA_PRACY'">
                  <span class="decyzja">Decyzja:</span>
                  {{ mapDecyzjaLabelToText(wizyta.pacjent.decyzja) }}
                  <v-select
                    v-model="wizyta.pacjent.decyzja"
                    :items="decyzje"
                    menu-props="auto"
                    label="Wybierz decyzje"
                    prepend-icon="map"
                    return-object
                    @change="
                      submitDecyzja(
                        wizyta.pacjent.pacjentId,
                        wizyta.pacjent.decyzja.label
                      )
                    "
                  ></v-select>
                </div>
                <my-button
                  v-if="!wizyta.faktura"
                  color="error"
                  fontColor="white"
                  height="35px"
                  @click.native="deleteWizyta(wizyta.wizytaId)"
                  >Usuń wizytę</my-button
                >
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
        <div class="pagination">
          <v-pagination
            v-model="currentPage"
            :page="currentPage"
            :length="
              Math.floor(
                filteredVisibleWizyty.length % pageSize == 0
                  ? filteredVisibleWizyty.length / pageSize
                  : filteredVisibleWizyty.length / pageSize + 1
              )
            "
            @click.native="updatevisibleVisits"
          ></v-pagination>
        </div>
      </div>
      <v-card-text class="no-results-msg" v-if="brakDanychMessage">{{
        brakDanychMessage
      }}</v-card-text>
    </div>
  </v-container>
</template>

<script>
import apiService from '@/services/apiService.js'
import { decyzje, decyzje2 } from '@/constants/constants'

export default {
  data: () => ({
    isAscending: true,
    isLoading: true,
    wizyty: null,
    incompleteCounter: null,
    decyzja: '',
    decyzje: [],
    selectedTypWizyty: '',
    startDate: '',
    endDate: '',
    dateMenu1: false,
    dateMenu2: false,
    dataOrzeczeniaMenu: false,
    dataOrzeczenia: null,
    brakDanychMessage: null,
    currentPage: 1,
    pageSize: 10,
    visibleVisits: [],
    lastRequest: null
  }),
  mounted: function() {
    this.getAllWizyty()
    this.getCounter()

    this.decyzje = decyzje
  },
  methods: {
    deleteWizyta(id) {
      apiService.deleteWizyta(id).then(() => {
        this.getAllWizyty()
      })
    },
    updatevisibleVisits() {
      let begin = this.currentPage * this.pageSize - this.pageSize
      let end = begin + this.pageSize

      this.visibleVisits = this.selectedWizyty.slice(begin, end)
    },

    submitDecyzja(pacjentID, decyzja) {
      apiService.submitDecyzja(pacjentID, decyzja).then(() => {
        this.getCounter()

        if (this.lastRequest === 'GET_ALL_WIZYTY') {
          this.getAllWizyty()
        } else {
          this.getIncompleteVisits()
        }
      })
    },

    submitDataOrzeczenia(pacjentID, dataOrzeczenia) {
      apiService.submitDataOrzeczenia(pacjentID, dataOrzeczenia).then(() => {
        this.getCounter()

        if (this.lastRequest === 'GET_ALL_WIZYTY') {
          this.getAllWizyty()
        } else {
          this.getIncompleteVisits()
        }
      })
    },

    getCounter() {
      apiService.getCounter().then(response => {
        this.incompleteCounter = response.data.counter
      })
    },

    mapDecyzjaLabelToText(decyzjaLabel) {
      return decyzje2[decyzjaLabel]
    },

    getIncompleteVisits() {
      apiService.getIncompleteVisits().then(response => {
        this.saveVisits(response)
        this.lastRequest = 'GET_INCOMPLETE'
      })
    },

    getWizytyByDate(startDate, endDate) {
      apiService.getWizytyByDate(startDate, endDate).then(response => {
        this.saveVisits(response)
      })
    },

    sortVisitsByDate(type) {
      this.wizyty.sort((a, b) => {
        if (type == 'ascending') {
          this.isAscending = true
          return new Date(a.dataWizyty) - new Date(b.dataWizyty)
        } else {
          this.isAscending = false
          return new Date(b.dataWizyty) - new Date(a.dataWizyty)
        }
      })
    },
    saveVisits(response) {
      if (response.data.length) {
        this.$store.commit('GET_ALL_WIZYTY_FROM_DB', response.data)
        this.wizyty = this.$store.getters.getAllWizyty
        this.isLoading = false
        this.brakDanychMessage = null
      } else {
        this.brakDanychMessage = 'Nie znaleziono wizyt dla podanego zakresu dat'
      }
    },
    getAllWizyty() {
      apiService.getWizyty().then(response => {
        this.saveVisits(response)
        this.lastRequest = 'GET_ALL_WIZYTY'
      })
    }
  },
  computed: {
    badgeStyles() {
      return {
        background: this.incompleteCounter > 0 ? 'red' : 'green'
      }
    },
    selectedWizyty() {
      if (this.wizyty) {
        return this.wizyty.filter(wizyta => {
          return wizyta.typWizyty.match(this.selectedTypWizyty)
        })
      } else {
        return this.wizyty
      }
    },
    filteredVisibleWizyty() {
      return this.selectedWizyty.filter(wizyta => {
        return wizyta.typWizyty.match(this.selectedTypWizyty)
      })
    }
  },
  watch: {
    wizyty: function() {
      this.updatevisibleVisits()
    },
    selectedWizyty: function() {
      this.currentPage = 1
      this.updatevisibleVisits()
    }
  }
}
</script>

<style lang="scss">
.szukajka {
  display: flex;
  padding: 0px 0px 50px;
}

.sort-btn {
  display: flex;
  align-content: center;
  padding-right: 20px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
}

.margin-top-2 {
  margin-top: 14px;
}

.v-chip.chip {
  color: black;
  background: rgba(0, 0, 0, 0.2);

  &--active {
    color: white;
    background: #20ce99;
  }
}
.title-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
}
.orzeczenia {
  border: 1px solid rgba(131, 44, 44, 0.2);
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;

  .counter-badge {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 23px;
    width: fit-content;
    height: 23px;
    padding: 0 4px;
    border-radius: 50px;
    background: #f44336;
    margin-left: 10px;
    color: white;
    font-weight: bold;
  }
  &:hover {
    background-color: #eee;
  }
}
.decyzja {
  font-size: 16px;
}

.wizyta {
  &__header {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .col2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__details {
    display: flex;
  }

  &__details-col {
    display: flex;
    flex-direction: column;

    width: 33.33%;
    ul {
      padding: 0px;
      li {
        font-size: 16px;
        line-height: 26px;
      }
    }
  }
}

.no-results-msg {
  display: flex;
  justify-content: center;
  font-size: 18px;
}
</style>
