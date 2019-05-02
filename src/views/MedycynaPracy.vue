<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap class="white rounded" my-5 elevation-10>
      <v-flex xs12>
        <FormTypeOfService v-if="currentStepNumber === 1" @update="processStep"/>
        <FormCompany v-if="currentStepNumber === 2" @update="processStep"/>
        <FormDatePicker v-if="currentStepNumber === 3" @update="processStep"/>
        <FormSummary v-if="currentStepNumber === 4" @update="processStep"/>
        <span>Krok: {{currentStepNumber}}/4</span>
        <div class="progress-bar">
          <div :style="`width: ${progress}%`"></div>
        </div>
        <div class="buttons">
          <v-btn @click="goBack" v-if="currentStepNumber > 1" color="disabled">Wstecz</v-btn>
          <v-btn @click="goNext" v-if="currentStepNumber < 4" color="success">Dalej</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <pre><code>{{patientForReg}}</code></pre>
  </v-container>
</template>

<script>
import FormTypeOfService from "../components/FormTypeOfService";
import FormCompany from "../components/FormCompany";
import FormDatePicker from "../components/FormDatePicker";
import FormSummary from "../components/FormSummary";
const uuidv1 = require("uuid/v1");

export default {
  components: {
    FormTypeOfService,
    FormCompany,
    FormDatePicker,
    FormSummary
  },
  data() {
    return {
      currentStepNumber: 1,
      length: 4,
      patientForReg: {
        id: uuidv1()
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
    processStep(stepData) {
      Object.assign(this.patientForReg, stepData);
    },
    goBack() {
      this.currentStepNumber--;
    },
    goNext() {
      this.currentStepNumber++;
    }
  }
};
</script>

<style lang="scss">
.rounded {
  border-radius: 5px;
}

.progress-bar {
  width: 100%;
  height: 20px;
  border-radius: 5px 10px 10px 5px;
  background: lighten(grey, 45);
  /* border: 1px solid lighten(grey, 35); */

  div {
    background: #1976d2;
    border-radius: 5px 10px 10px 5px;
    height: 90%;
    transform: translateY(5%);
    transition: 0.6s all;
  }
}
</style>
