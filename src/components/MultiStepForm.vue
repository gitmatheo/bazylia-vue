<template>
 <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <FormTypeOfService v-if="currentStepNumber === 1">
        <FormChooseService v-if="currentStepNumber === 2">
        <FormDatePicker v-if="currentStepNumber === 3">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FormTypeOfService from "./FormTypeOfService";
import FormDatePicker from "./FormDatePicker";
import FormChooseService from "./FormChooseService";

export default {
  components: {
    FormTypeOfService,
    FormDatePicker,
    FormChooseService
  },
  data() {
    return {
      currentStepNumber: 1,
      length: 4,
      patientForReg: {
        // id: null,
        // company: "",
        // name: "",
        // secondName: "",
        // pesel: "",
        // serviceName: "",
        // invoice: ""
      }
    };
  },
  computed: {
    progress() {
      return (this.currentStepNumber / this.length) * 100;
    }
  },
  methods: {
    goBack() {
      this.currentStepNumber--;
    },
    goNext() {
      this.currentStepNumber++;
    }
  }
};
</script>

<style>
</style>
