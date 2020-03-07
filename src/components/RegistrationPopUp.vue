<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <my-button v-on="on">
          <slot></slot>
        </my-button>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Rejestracja pacjenta.</v-card-title>
        <v-card-text>
          Imię: {{patients.name}}
          Nazwisko: {{patients.secondName}}
          Firma: {{patients.company}}
          PESEL: {{patients.pesel}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <my-button 
              to="/medycyna-pracy"
              @click.native="onClickButton(typWizytyConst.MEDYCYNA_PRACY)"
              >Medycyna Pracy</my-button>
          <my-button
              to="/specjalistyka"
              color="#F44336"
              @click.native="onClickButton(typWizytyConst.SPECJALISTYKA)"
              >Specjalistyka</my-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import MyButton from "../components/MyButton";
import { typWizytyConst } from '../constants/constants';

export default {
  components: {
    MyButton
  },
  props: ["patients", "deletePatient", "color"],
  data() {
    return {
      dialog: false,
      typWizytyConst: typWizytyConst,
    };
  },
  methods: {
    confirmDelete() {
      this.dialog = false;
    },
    cancelDelete() {
      this.dialog = false;
    },
    onClickButton (event) {
      console.log("event inside dialog box")
      console.log(event);
      this.$emit('clicked', event)
    }
  }
};
</script>

<style>
</style>
