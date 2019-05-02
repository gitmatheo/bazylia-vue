<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
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
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
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
        i godzinę:
        <span>{{time}}</span>
      </p>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    time: null,
    menu3: false,
    modal2: false,
    landscape: true,
    reactive: false,
    patientForReg: {}
  }),
  mounted: function() {
    this.patientForReg = this.$store.getters.getPatientForReg;
    console.log("FormDatePicker - MOUNTED");
    console.log(this.patientForReg);
  },
  updated: function() {
    this.patientForReg.date = this.date;
    this.patientForReg.time = this.time;
    this.addDateAndTime(this.patientForReg);
    console.log("FormDatePicker - UPDATED");
    console.log(this.patientForReg);
  },
  methods: {
    ...mapMutations(["UPDATE_PATIENT_FOR_REGISTRATION"]),
    addDateAndTime(patientForReg) {
      this.UPDATE_PATIENT_FOR_REGISTRATION(patientForReg);
    }
  }
};
</script>

<style>
</style>
