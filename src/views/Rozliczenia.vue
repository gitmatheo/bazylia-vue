<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
      <h2>Rozliczenia</h2>
      <v-card-text v-if="rozliczenia">
        <v-expansion-panel my-2 class="patient elevation-0">
          <v-expansion-panel-content
            v-for="(rozliczenie, i) in rozliczenia"
            :key="i"
          >
            <template v-slot:header>
              <ul class="patient__header">
                <li>{{ rozliczenie.firma.nazwa }}</li>
                <!-- <li>{{rozliczenie.firma.ulica}}</li>
                <li>regon: {{rozliczenie.firma.regon}}</li> -->
                <li class="patient__details-element">Szczegóły</li>
              </ul>
            </template>
            <v-card>
              <div class="btns-wrapper">
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on }">
                    <!-- <my-button dark v-on="on">Wystaw fakturę</my-button> -->
                    <v-btn v-on="on">Wystaw fakturę</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline en-2" primary-title
                      >Wystawianie faktury</v-card-title
                    >

                    <v-container>
                      <h3>Sposób płatności</h3>
                      <v-radio-group v-model="sposobPlatnosciGroup">
                        <v-flex row>
                          <v-radio
                            v-for="item in sposobPlatnosci"
                            :key="item"
                            :label="`${item}`"
                            :value="item"
                          ></v-radio>
                        </v-flex>
                      </v-radio-group>

                      <!-- <v-divider></v-divider> -->
                      <h3>Rodzaj daty:</h3>
                      <v-radio-group v-model="rodzajDatyGroup">
                        <v-flex row>
                          <v-radio
                            v-for="item in rodzajDaty"
                            :key="item"
                            :label="`${item}`"
                            :value="item"
                          ></v-radio>
                        </v-flex>
                      </v-radio-group>
                      <!-- <v-divider></v-divider> -->
                      <h3>Termin płatności:</h3>
                      <v-radio-group v-model="terminPlatnosciGroup">
                        <v-radio
                          v-for="item in terminPlatnosci"
                          :key="item"
                          :label="`${item}`"
                          :value="item"
                        ></v-radio>
                      </v-radio-group>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <my-button color="white" @click.native="dialog = false"
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
                  class="patient__list-element"
                  v-for="(pacjent, i) in rozliczenie.pacjenci"
                  :key="i"
                >
                  <div>
                    {{ pacjent.pacjent.imie }}
                    {{ pacjent.pacjent.nazwisko }}
                  </div>

                  <ul class="patient__service">
                    <li v-for="(wizyta, i) in pacjent.wizyty" :key="i">
                      <div>
                        <span>{{ wizyta.usluga.nazwa }}</span>
                        <!-- <br />
                        <span>{{wizyta.dataWizyty | moment("MM-DD-YYYY")}} </span> -->
                      </div>
                      <div class="patient__checkbox">
                        <v-checkbox
                          v-model="selected"
                          :label="wizyta.dataWizyty"
                          :value="wizyta.wizytaId"
                          @change="updateWizytyDoZafakturowania"
                        ></v-checkbox>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- <pre><code> {{selected}} </code></pre> -->
      </v-card-text>
      <v-card-text v-if="brakDanychMessage">{{
        brakDanychMessage
      }}</v-card-text>
    </div>
    <pre><code> {{doZafakturowania}} </code></pre>
  </v-container>
</template>

<script>
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    rozliczenia: false,
    brakDanychMessage: false,
    selected: [],
    selectAll: false,
    dialog: false,
    terminPlatnosci: [7, 14, 30],
    terminPlatnosciGroup: '',
    sposobPlatnosci: ['GOTOWKA', 'PRZELEW'],
    sposobPlatnosciGroup: '',
    rodzajDaty: ['MIESIAC', 'DATA_WYSTAWIENIA'],
    rodzajDatyGroup: '',
    doZafakturowania: {
      wizyty: [],
      terminPlatnosci: '',
      sposobPlatnosci: '',
      rodzajDaty: ''
    }
  }),
  mounted: function() {
    apiService
      .getRozliczenia()
      .then(response => {
        if (response.data.length) {
          this.$store.commit('GET_ALL_ROZLICZENIA_FROM_DB', response.data)
          this.rozliczenia = this.$store.getters.getAllRozliczenia
        } else {
          this.brakDanychMessage = 'Brak danych w bazie'
        }
      })
      .catch(err => console.error(err))
  },
  updated: function() {
    this.doZafakturowania.terminPlatnosci = this.terminPlatnosciGroup
    this.doZafakturowania.sposobPlatnosci = this.sposobPlatnosciGroup
    this.doZafakturowania.rodzajDaty = this.rodzajDatyGroup
  },
  methods: {
    updateWizytyDoZafakturowania() {
      // console.log("what")
      // console.log(this.selected)
      this.doZafakturowania.wizyty = this.selected
    },
    select(rozliczenie) {
      this.selected = []
      this.doZafakturowania.wizyty = []
      if (this.selectAll) {
        rozliczenie.pacjenci.map(pacjent => {
          pacjent.wizyty.map(wizyta => {
            this.selected.push(wizyta.wizytaId)
            this.doZafakturowania.wizyty = this.selected
          })
        })
      }
    },
    submitForInvoice(doZafakturowania) {
      apiService
        .submitForInvoice(doZafakturowania)
        .then(response => {
          const fakturaId = response.headers.location.match(
            /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
          )[0]
          if (fakturaId) {
            this.$router.push({ path: `/invoice/${fakturaId}` })
          } else {
            console.error('Cos nie tak z fakturami... przepraszamy.')
          }
        })
        .catch(err => console.error(err))
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

.accent--text {
  color: #20ce99 !important;
  caret-color: #20ce99 !important;
}

.patient {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  &__card {
    display: flex;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    padding: 0px;
    justify-content: space-between;

    &--bold {
      font-weight: bold;
    }
  }

  &__desc {
    display: flex;
    justify-content: space-between;
  }

  &__desc-col {
    padding-top: 2rem;
    padding-left: 0px;

    li {
      display: flex;
      padding-top: 8px;
    }
  }

  &__btns {
    display: flex;
    padding: 10px 0px;
  }

  &__list-element {
    margin: 20px 0 30px;
  }

  &__service {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      align-items: flex-end;
      .patient__checkbox {
        height: 40px;
      }
    }
  }

  &__details-element {
    text-align: right;
    padding-right: 3px;
  }
}

.v-input {
  &__slot {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
