<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
      <h2>Rozliczenia</h2>
      <Loader v-if="isLoading" />
      <v-card-text v-if="rozliczenia && !isLoading">
        <v-expansion-panel my-2 class="patient elevation-0">
          <v-expansion-panel-content
            v-for="(rozliczenie, i) in rozliczenia"
            :key="i"
          >
            <template v-slot:header>
              <ul class="patient__header">
                <li>{{ rozliczenie.firma.nazwa }}</li>
                <li
                  class="patient__details-element"
                  :class="
                    rozliczenie.incomplete ? 'do-rozliczenia' : 'rozliczono'
                  "
                >
                  {{ rozliczenie.incomplete ? 'Do rozliczenia' : 'Rozliczono' }}
                </li>
              </ul>
            </template>
            <v-card>
              <div v-if="rozliczenie.incomplete" class="btns-wrapper">
                <my-button @click.native="dialog = true" color="success">
                  Wystaw fakturę
                </my-button>
                <div class="select-all-checkbox">
                  <v-checkbox
                    v-model="selectAll"
                    :label="`Zaznacz wszystkie`"
                    @change="select(rozliczenie)"
                  ></v-checkbox>
                </div>
              </div>
              <ul>
                <li
                  v-for="miesiac in rozliczenie.miesiace"
                  :key="miesiac.miesiac"
                >
                  <h3>{{ miesiac.miesiac }}</h3>
                  <ul>
                    <li
                      class="patient__list-element"
                      v-for="(pacjent, i) in miesiac.pacjenci"
                      :key="i"
                    >
                      <div>
                        {{ pacjent.pacjent.imie }}
                        {{ pacjent.pacjent.nazwisko }}
                      </div>

                      <ul class="patient__service">
                        <li v-for="(wizyta, i) in pacjent.wizyty" :key="i">
                          <div class="patient__service-desc">
                            <span
                              >{{ wizyta.dataWizyty | moment('MM-DD-YYYY') }}
                            </span>
                            &nbsp; - &nbsp;
                            <span> {{ wizyta.usluga.nazwa }}</span>
                          </div>
                          <div v-if="!wizyta.faktura" class="patient__checkbox">
                            <v-checkbox
                              v-model="selected"
                              :value="wizyta.wizytaId"
                              :label="'Zaznacz'"
                              @change="updateWizytyDoZafakturowania"
                            ></v-checkbox>
                          </div>

                          <div
                            v-if="wizyta.faktura"
                            class="patient__show-invoice"
                          >
                            <router-link :to="`/faktury/${wizyta.faktura}`"
                              >Pokaż fakturę</router-link
                            >
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li></li>
              </ul>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>
      <v-card-text v-if="brakDanychMessage">{{
        brakDanychMessage
      }}</v-card-text>
    </div>

    <!-- v-dialog ten sam co w RozliczeniaSpecjalistyka. wyrzucic do osobnego komponntu-->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-3" primary-title
          >Wystawianie faktury</v-card-title
        >

        <v-container>
          <h3>Sposób płatności</h3>
          <v-radio-group v-model="sposobPlatnosciGroup">
            <v-radio
              v-for="item in sposobPlatnosci"
              :key="item"
              :label="`${item}`"
              :value="item"
            ></v-radio>
          </v-radio-group>
          <h3>Data wystawienia faktury</h3>
          <v-flex xs6>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <div class="form__input-wrapper">
                  <v-text-field
                    v-model="doZafakturowania.dataFaktury"
                    label="Wybierz datę"
                    data-cy="date-picker"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </div>
              </template>
              <v-date-picker
                v-model="doZafakturowania.dataFaktury"
                no-title
                locale="pl-PL"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <h3>Data wykonania usługi:</h3>

          <div class="select-date">
            <v-flex xs6>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <div class="form__input-wrapper">
                    <v-text-field
                      v-model="doZafakturowania.dataSprzedazy"
                      label="Wybierz datę"
                      data-cy="date-picker"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </div>
                </template>
                <v-date-picker
                  v-model="doZafakturowania.dataSprzedazy"
                  no-title
                  locale="pl-PL"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-checkbox
              class="only-month-checkbox"
              v-model="doZafakturowania.tylkoMiesiac"
              label="Tylko miesiąc"
            ></v-checkbox>
          </div>

          <h3>Termin płatności:</h3>
          <v-radio-group v-model="terminPlatnosciGroup">
            <v-radio
              v-for="item in terminPlatnosci"
              :key="item"
              :label="`${item}`"
              :value="item"
            ></v-radio>
          </v-radio-group>
          <v-card-actions class="px-0 justify-center">
            <my-button
              color="white"
              fontColor="black"
              @click.native="dialog = false"
              >Anuluj</my-button
            >
            <my-button
              color="#20CE99"
              fontColor="white"
              @click.native="submitForInvoice(doZafakturowania)"
              >Wystaw Fakturę</my-button
            >
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    isLoading: true,
    rozliczenia: false,
    brakDanychMessage: false,
    selected: [],
    selectAll: false,
    dialog: false,
    menu: false,
    menu2: false,
    terminPlatnosci: [7, 14, 30],
    terminPlatnosciGroup: '',
    sposobPlatnosci: ['GOTOWKA', 'PRZELEW'],
    sposobPlatnosciGroup: '',
    doZafakturowania: {
      wizyty: [],
      terminPlatnosci: '',
      sposobPlatnosci: '',
      dataFaktury: new Date().toISOString().substr(0, 10),
      dataSprzedazy: new Date().toISOString().substr(0, 10),
      tylkoMiesiac: false
    }
  }),
  mounted: function() {
    apiService.getRozliczenia('medycyna-pracy').then(response => {
      if (response.data.length) {
        this.$store.commit('GET_ALL_ROZLICZENIA_FROM_DB', response.data)
        this.rozliczenia = this.$store.getters.getAllRozliczenia
        this.rozliczenia = this.rozliczenia.map(rozliczenie => {
          let incomplete = false
          rozliczenie.miesiace.map(miesiac => {
            miesiac.pacjenci.map(pacjent => {
              pacjent.wizyty.map(wizyta => {
                if (!wizyta.faktura) {
                  incomplete = true
                }
              })
            })
          })
          return {
            ...rozliczenie,
            incomplete
          }
        })

        this.isLoading = false
      } else {
        this.brakDanychMessage = 'Brak danych w bazie'
      }
    })
  },
  updated: function() {
    this.doZafakturowania.terminPlatnosci = this.terminPlatnosciGroup
    this.doZafakturowania.sposobPlatnosci = this.sposobPlatnosciGroup
    this.doZafakturowania.rodzajDaty = this.rodzajDatyGroup
  },
  methods: {
    updateWizytyDoZafakturowania() {
      this.doZafakturowania.wizyty = this.selected
    },
    select(rozliczenie) {
      this.selected = []
      this.doZafakturowania.wizyty = []
      if (this.selectAll) {
        rozliczenie.miesiace.map(miesiac => {
          miesiac.pacjenci.map(pacjent => {
            pacjent.wizyty.map(wizyta => {
              if (!wizyta.faktura) {
                this.selected.push(wizyta.wizytaId)
                this.doZafakturowania.wizyty = this.selected
              }
            })
          })
        })
      }
    },
    submitForInvoice(doZafakturowania) {
      apiService.submitForInvoice(doZafakturowania).then(response => {
        if (response.headers.location) {
          this.$router.push({ path: `${response.headers.location}` })
        } else {
          console.error('Cos nie tak z fakturami... przepraszamy.')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.btns-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-date {
  display: flex;
  justify-content: space-between;

  .only-month-checkbox {
    .v-input__slot {
      display: flex;
      flex-direction: initial;
      margin: 8px;
    }
  }
}

.patient {
  &__show-invoice {
    display: flex;
    align-items: flex-end;
    margin-bottom: -5px;
  }
  &__checkbox {
    margin-right: -10px;
  }
}
.select-all-checkbox {
  margin-right: -10px;
}

.v-input {
  &__slot {
    display: flex;
    flex-direction: row-reverse;
  }
}

.do-rozliczenia {
  color: #f44336;
}

.rozliczono {
  color: #20ce99;
}
</style>
