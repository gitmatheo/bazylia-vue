<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - {{title}}</h2>
    <h3>Wybierz datę i godzinę</h3>
    <v-layout row wrap justify-center>
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
            <v-text-field
              v-model="date"
              label="Wybierz datę"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false" :min="nowDate"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs6>
        <v-menu
          ref="menu"
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              label="Wybierz godzinę"
              prepend-icon="access_time"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu3"
            v-model="time"
            full-width
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>

        <!-- <v-time-picker v-model="timePicker"></v-time-picker> -->
      </v-flex>

      <p>
        Wybrano datę:
        <span>{{date}}</span>
      </p>
      <p>
         &nbsp; i godzinę:
        <span>{{time}}</span>
      </p>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["title"],
  data: () => ({
    nowDate: new Date().toISOString().substr(0, 10),
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    time: null,
    menu3: false,
    modal2: false,
    landscape: true,
    reactive: false,
    wizyta: {},
  }),
  // mounted: function() {
  //   this.wizyta = this.$store.getters.getWizyta;
  // },
  updated: function() {
    console.log("updateeed FormDatePicker")
    console.log(this.wizyta.dataWizyty)

    let timeString = this.time + ':00';
    let dataWizyty = new Date(this.date + ' ' + timeString).toISOString();
    this.wizyta.dataWizyty = dataWizyty;
    console.log(this.wizyta.dataWizyty)
    this.addDateAndTime(dataWizyty);

  },
  methods: {
    ...mapMutations(["UPDATE_DATE_AND_TIME"]),
    addDateAndTime(dataWizyty) {
      this.UPDATE_DATE_AND_TIME(dataWizyty);
    }
  }
};
</script>

<style>
</style>
