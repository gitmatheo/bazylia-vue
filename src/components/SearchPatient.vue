<template>
  <v-layout row justify-center>
    <v-flex xs12 class="search-form white" elevation-5>
      <h2>Wyszukaj Pacjenta</h2>

      <v-form v-model="valid" lazy-validation>
        <v-container>
          <v-layout>
            <v-flex xs12 md4>
              <v-text-field v-model="name" label="Imię" required></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field v-model="secondName" label="Nazwisko" required></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field v-model="pesel" :rules="peselRules" label="PESEL" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-btn :disabled="!valid" color="success" @click="submit">
          <span>Szukaj</span>
          <v-icon right>search</v-icon>
        </v-btn>
        <v-btn color="indigo" class="white--text" @click="getPatients">Pokaż wszystkich pacjentów</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["getPatients"],
  data: () => ({
    valid: true,
    name: "",
    secondName: "",
    pesel: null,
    peselRules: [
      v => (v && v.length == 11) || "PESEL powinien składać się z 11 cyfr"
    ]
  }),

  methods: {
    submit() {
      this.name = "";
      this.secondName = "";
      this.pesel = null;
      console.log({
        name: this.name,
        secondName: this.secondName,
        pesel: this.pesel
      });
    }
  }
};
</script>

<style>
</style>
