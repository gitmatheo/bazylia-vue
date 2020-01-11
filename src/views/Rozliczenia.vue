<template>
  <v-layout class="search-form" row justify-center>
    <v-card my-4 class="elevation-15">
      <v-card-title>
        <span class="headline">Rozliczenia</span>
      </v-card-title>
      <v-card-text>
<pre><code> {{rozliczenia}} </code></pre>

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
                          <v-checkbox v-model="selected" label="Zaznacz do zafakturowania" :value="wizyta.wizytaId"></v-checkbox>
                        </li>
                      </ul>
                    </li>


                  </ul>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <pre><code> {{selected}} </code></pre>
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
    }),
  mounted: function() {
    this.patientForReg = this.$store.getters.getPatientForReg;
    axios.get(`${API.url}/rozliczenia/medycyna-pracy`)
        .then((response) => {
            console.log(response.data);
            this.$store.commit('GET_ALL_ROZLICZENIA_FROM_DB', response.data);
            this.rozliczenia = this.$store.getters.getAllRozliczenia;
          })
        .catch(err => console.log(err))
  },
};
</script>

<style>
</style>
