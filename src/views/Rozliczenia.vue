<template>
  <v-layout class="search-form" row justify-center>
    <v-card my-4 class="elevation-15">
      <v-card-title>
        <span class="headline">Rozliczenia</span>
      </v-card-title>
      <v-card-text>
<!-- <pre><code> {{rozliczenia}} </code></pre> -->
                    <v-layout row mt-5>
                  <v-flex xs12 justify-center pb-4>
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn color="green" dark v-on="on">Wystaw fakturę</v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>Wystawianie faktury</v-card-title>

                        <pre>{{sposobPlatnosciGroup}}</pre>
                        <pre>{{sposobPlatnosci}}</pre>

                        <v-divider></v-divider>
                        <v-card-text>Sposób płatności</v-card-text>
                        <v-container>
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

                          <v-divider></v-divider>
                          <v-card-text>Rodzaj daty:</v-card-text>
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

                          <v-card-text>Termin płatności:</v-card-text>
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
                            <v-btn color="grey" flat @click="dialog = false">Anuluj</v-btn>
                            <v-btn color="success" flat @click="dialog = false">Wystaw Fakturę</v-btn>
                          </v-card-actions>
                        </v-container>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <!-- TODO WEZ TO OGARNIJ -->
                <v-btn color="green" dark @click="slijKurwaNaSerwerMojAmigo">Wyslij do zafakturowania</v-btn>


       <v-expansion-panel my-2>
              <v-expansion-panel-content v-for="(rozliczenie, i) in rozliczenia" :key="i">
                <template v-slot:header>
                  <ul class="patient__header">
                    <li>{{rozliczenie.firma.nazwa}}</li>
                    <li>{{rozliczenie.firma.ulica}}</li>
                    <li>regon: {{rozliczenie.firma.regon}}</li>
                  </ul>
                </template>
                <v-card>
                  <ul >
                    <li v-for="(pacjent, i) in rozliczenie.pacjenci" :key="i">
                      {{pacjent.pacjent.imie}}
                      <ul>
                        <li v-for="(wizyta, i) in pacjent.wizyty" :key="i" >
                          Nazwa usługi: {{wizyta.usluga.nazwa}}
                          <br>
                          Data: {{wizyta.dataWizyty | moment("MM-DD-YYYY")}}
                          <v-checkbox v-model="selected" label="Zaznacz do zafakturowania" :value="wizyta.wizytaId" @click="updateWizytyDoZafakturowania"></v-checkbox>
                        </li>
                      </ul>
                    </li>


                  </ul>
                </v-card>

              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- <pre><code> {{selected}} </code></pre> -->
            <pre><code> {{doZafakturowania}} </code></pre>
      </v-card-text>
    </v-card>

  </v-layout>
</template>

<script>
import API from "../constants/api";
import axios from 'axios';

export default {

  data: () => ({
    rozliczenia: false,
    selected: [],
    dialog: false,
    terminPlatnosci: [7, 14, 30],
    terminPlatnosciGroup: '',
    sposobPlatnosci: ["GOTOWKA", "PRZELEW"],
    sposobPlatnosciGroup: '',
    rodzajDaty: ["MIESIAC", "DATA_WYSTAWIENIA"],
    rodzajDatyGroup: '',
    doZafakturowania: {
      wizyty: [],
      terminPlatnosci: '',
      sposobPlatnosci: '',
      rodzajDaty: '',
    }
    }),
  mounted: function() {
    axios.get(`${API.url}/rozliczenia/medycyna-pracy`)
        .then((response) => {
            this.$store.commit('GET_ALL_ROZLICZENIA_FROM_DB', response.data);
            this.rozliczenia = this.$store.getters.getAllRozliczenia;
          })
        .catch(err => console.log(err))
  },
  updated: function(){
    this.doZafakturowania.terminPlatnosci = this.terminPlatnosciGroup;
    this.doZafakturowania.sposobPlatnosci = this.sposobPlatnosciGroup;
    this.doZafakturowania.rodzajDaty = this.rodzajDatyGroup;
  },
  methods: {
    updateWizytyDoZafakturowania() {
      this.doZafakturowania.wizyty = this.selected;
    },
    slijKurwaNaSerwerMojAmigo() {
      axios.post(`${API.url}/faktury`, this.doZafakturowania)
        .then((response) => {
          console.log(response);
          })
        .catch(err => console.log(err))
    }
  }
};
</script>

<style>
</style>
