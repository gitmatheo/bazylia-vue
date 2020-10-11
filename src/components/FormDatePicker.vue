<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - {{ title }}</h2>
    <h3>Wybierz datę i godzinę</h3>
    <v-layout row wrap justify-center>
      <v-flex xs3>
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
                v-model="date"
                label="Wybierz datę"
                data-cy="date-picker"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </div>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            locale="pl-PL"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs3>
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
            <div class="form__input-wrapper">
              <v-text-field
                v-model="time"
                label="Wybierz godzinę"
                data-cy="time-picker"
                prepend-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </div>
          </template>
          <v-time-picker
            v-if="menu3"
            v-model="time"
            full-width
            locale="pl-PL"
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['title'],
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    time: '21:15',
    menu3: false,
    modal2: false,
    landscape: true,
    reactive: false,
    wizyta: {}
  }),
  mounted: function() {
    let now = new Date()
    this.wizyta = this.$store.getters.getWizyta
    let minutes =
      now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
    this.time = now.getHours() + ':' + minutes
  },
  updated: function() {
    let timeString = this.time + ':00'
    let dataWizyty = new Date(this.date + ' ' + timeString).toISOString()
    this.wizyta.dataWizyty = dataWizyty

    this.addDateAndTime(dataWizyty)
  },
  methods: {
    ...mapMutations(['UPDATE_DATE_AND_TIME']),
    addDateAndTime(dataWizyty) {
      this.UPDATE_DATE_AND_TIME(dataWizyty)
    }
  }
}
</script>

<style></style>
