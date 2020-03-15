<template>
  <v-layout row justify-center>
    <v-flex xs12 class="search-form white">
      <h2>Wyszukaj Pacjenta</h2>

      <v-form v-model="valid" lazy-validation>
        <v-container>
          <v-layout>
            <v-flex xs12 md3>
              <v-text-field
                v-model="name"
                @change.stop="getPatients"
                label="Imię"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md3>
              <v-text-field
                v-model="secondName"
                @change="getFilteredPatients"
                label="Nazwisko"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md3>
              <v-text-field
                v-model="pesel"
                :rules="peselRules"
                @change="getFilteredPatients"
                label="PESEL"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md3>
              <v-btn :disabled="!valid">
                <span>Szukaj</span>
                <v-icon right>search</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>

        <v-btn class="white--text" @click="getPatients"
          >Pokaż wszystkich pacjentów</v-btn
        >
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['getPatients', 'name', 'secondName', 'pesel', 'getFilteredPatients'],
  data: () => ({
    valid: true,
    peselRules: [
      v => (v && v.length == 11) || 'PESEL powinien składać się z 11 cyfr'
    ]
  }),

  methods: {
    submit() {
      this.name = ''
      this.secondName = ''
      this.pesel = null
    }
  }
}
</script>

<style></style>
