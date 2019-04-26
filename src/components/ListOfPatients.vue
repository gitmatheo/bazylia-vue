<template>
  <v-layout row justify-center>
    <v-flex xs12 class="search-form white" mt-5 elevation-5>
      <h2>Lista pacjentów</h2>
      <v-expansion-panel my-2>
        <v-expansion-panel-content v-for="(patient,i) in patients" :key="i">
          <template v-slot:header>
            <ul class="patient__header">
              <li>{{patient.name}}</li>
              <li>{{patient.secondName}}</li>
              <li>PESEL: {{patient.pesel}}</li>
              <li>{{patient.company}}</li>
            </ul>
          </template>
          <v-card>
            <ul ref="patient" class="patient__desc">
              <li>Imię: {{patient.name}}</li>
              <li>Nazwisko: {{patient.secondName}}</li>
              <li>Firma: {{patient.company}}</li>
              <li>PESEL: {{patient.pesel}}</li>
              <li>
                <v-btn color="success" class="customBtn" @click="register(i)">Rejestruj wizytę</v-btn>
                <!-- <DialogBox
                  color="green"
                  :patients="patients[i]"
                  @click="deletePatient"
                >Rejestruj wizytę</DialogBox>-->
                <v-btn color="error" class="customBtn" @click="deletePatient(i)">Usuń Pacjenta</v-btn>
                <!-- <DialogBox color="red" :patients="patients[i]" @click="deletePatient">Usuń Pacjenta</DialogBox> -->
              </li>
            </ul>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogBox from "../components/DialogBox";
export default {
  components: {
    DialogBox
  },
  props: ["patients", "deletePatient", "register"],
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss">
.patient__header {
  display: flex;
  list-style: none;
  justify-content: space-between;
  li {
    padding-right: 20px;
  }
}

.patient__desc {
  list-style: none;
  background: darken(white, 5);
  padding-top: 2rem;
  li {
    padding: 3px 0;
  }
}
.customBtn {
  margin: 20px 10px 20px 0px;
}
</style>
