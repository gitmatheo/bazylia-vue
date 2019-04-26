<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn :color="color" dark v-on="on">
          <slot></slot>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Uwaga!</v-card-title>
        <v-card-text>
          Jesteś pewny, że chcesz usunąć tego pacjenta?
          Imię: {{patients.name}}
          Nazwisko: {{patients.secondName}}
          Firma: {{patients.company}}
          PESEL: {{patients.pesel}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="cancelDelete">Nie. Wstecz</v-btn>
          <v-btn color="primary" flat @click="confirmDelete">Tak. Usuń</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["patients", "deletePatient", "color"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    confirmDelete() {
      this.dialog = false;
    },
    cancelDelete() {
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
