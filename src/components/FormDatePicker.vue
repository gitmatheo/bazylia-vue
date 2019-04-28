<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Wybierz datę</h3>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6>
        <v-date-picker v-model="datePicker" :landscape="landscape" :reactive="reactive"></v-date-picker>
        <!-- <v-time-picker v-model="timePicker" :landscape="landscape"></v-time-picker> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      datePicker: new Date().toISOString().substr(0, 10),
      timePicker: null,
      landscape: true,
      reactive: false
    };
  }
};
</script>

<style>
</style>
