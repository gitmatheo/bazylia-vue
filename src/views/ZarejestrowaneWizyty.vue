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
            <v-text-field
              v-model="startDate"
              class="date-input"
              label="Data początkowa"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
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
            <v-text-field
              v-model="endDate"
              class="date-input"
              label="Data końcowa"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
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
          @click.native="getWizytyByDate(startDate, endDate)"
          >Pobierz wizyty wg. daty</my-button
        >
      </div>
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
          getclass="orzeczenia"
        >
          Niezakończone
          <span class="counter-badge" :style="badgeStyles">
            {{ incompleteCounter }}</span
          >
        </div>
      </div>

      <Loader v-if="isLoading" />
      <v-card-text v-if="wizyty && !isLoading">
        <button class="sort-btn" @click="sortVisitsByDate('ascending')">
          Sortuj od najnowszych
        </button>
        <button class="sort-btn" @click="sortVisitsByDate()">
          Sortuj od najstarszych
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
                      wizyta.pacjent.decyzjaUpdated &&
                        wizyta.pacjent.dataOrzeczeniaUpdated
                    "
                    size="35px"
                    color="success"
                    >check</v-icon
                  >
                  <v-icon
                    v-if="
                      !(
                        wizyta.pacjent.decyzjaUpdated &&
                        wizyta.pacjent.dataOrzeczeniaUpdated
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
                    <li>
                      Data orzeczenia:
                      {{ wizyta.pacjent.dataOrzeczenia || `BRAK` }}

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
                            label="Data orzeczenia"
                            prepend-icon="event"
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
                    <li>Typ badań: {{ wizyta.rodzajBadan }}</li>
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
              <div>
                Decyzja:
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
          :page="currentPage + 1"
          :length="selectedWizyty.length / pageSize + 1"
          @click.native="updatevisibleVisits"
        ></v-pagination>
      </div>
      <v-card-text v-if="brakDanychMessage">{{
        brakDanychMessage
      }}</v-card-text>
    </div>
  </v-container>
</template>

<script lang="ts">
import apiService from '@/services/apiService.js'
import { decyzje, decyzje2 } from '@/constants/constants'

export default {
  data: () => ({
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
    pageSize: 12, // bug jak jest pageSize ustawiony na 10 i jest rowno 100 wynikow z BE to paginacja dostaje o jeden nr za duzo.
    visibleVisits: []
  }),
  mounted: function() {
    this.getAllWizyty()
    this.getCounter()

    // this.updatevisibleVisits()
    // console.log('Siema z mounted2')
    this.decyzje = decyzje
  },
  methods: {
    deleteWizyta(id) {
      apiService.deleteWizyta(id).then(() => {
        this.getAllWizyty()
      })
    },
    updatePage(pageNumber) {
      this.currentPage = pageNumber
      this.updatevisibleVisits()
    },
    updatevisibleVisits() {
      let begin = this.currentPage * this.pageSize - this.pageSize
      let end = begin + this.pageSize
      this.visibleVisits = this.selectedWizyty.slice(begin, end) //
      if (this.visibleVisits.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },

    submitDecyzja(pacjentID, decyzja) {
      apiService.submitDecyzja(pacjentID, decyzja)
    },
    submitDataOrzeczenia(pacjentID, dataOrzeczenia) {
      apiService.submitDataOrzeczenia(pacjentID, dataOrzeczenia)
    },

    getCounter() {
      console.log('getCounter step 1 ')
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
          return new Date(a.dataWizyty) - new Date(b.dataWizyty)
        } else {
          return new Date(b.dataWizyty) - new Date(a.dataWizyty)
        }
      })
    },
    saveVisits(response) {
      if (response.data.length) {
        this.$store.commit('GET_ALL_WIZYTY_FROM_DB', response.data)
        this.wizyty = this.$store.getters.getAllWizyty
        this.isLoading = false
      } else {
        this.brakDanychMessage = 'Brak danych w bazie'
      }
    },
    getAllWizyty() {
      apiService.getWizyty().then(response => {
        this.saveVisits(response)
      })
    }
  },
  computed: {
    brakOrzeczenia() {
      let brakOrzeczeniaCounter = 0
      this.wizyty.map(wizyta => {
        if (wizyta.pacjent.dataOrzeczenia) {
          brakOrzeczeniaCounter++
        }
      })
      return brakOrzeczeniaCounter
    },
    badgeStyles() {
      return {
        background: this.brakOrzeczenia > 0 ? 'red' : 'green'
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
    }
  },
  watch: {
    wizyty: function() {
      this.updatevisibleVisits()
    },
    selectedWizyty: function() {
      this.updatevisibleVisits()
    }
  }
}
</script>

<style lang="scss">
.szukajka {
  display: flex;
  padding: 0px 0px 50px;
  /* .date-input {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50px;
  } */
}

.sort-btn {
  padding-right: 20px;
  cursor: pointer;
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
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 16px;

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
  }
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
</style>
