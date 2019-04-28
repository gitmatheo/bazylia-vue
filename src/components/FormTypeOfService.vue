<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Wybierz typ badań</h3>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-radio-group row justify-center v-model="typeOfService" @click="select(typeOfService)">
          <v-radio label="Wstępne" color="error" value="wstępne" checked></v-radio>
          <v-radio label="Okresowe" color="error" value="okresowe"></v-radio>
          <v-radio
            label="Sanitarno-epidemiologiczne"
            color="error"
            value="sanitarno-epidemiologiczne"
          ></v-radio>
        </v-radio-group>
        <span>Wybrano: {{typeOfService}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      typeOfService: null,
      selectedTypeOfService: null
    };
  },
  methods: {
    select(typeOfService) {
      this.selectedTypeOfService = typeOfService;

      this.$emit("update", {
        typeOfService: this.selectedTypeOfService
      });
    }
  }
};
</script>

<style>
</style>
