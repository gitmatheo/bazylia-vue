<template>
  <v-layout class="search-form" row justify-center>
    <v-card my-4 class="elevation-15">
      <v-card-title>
        <span class="headline">Dodaj Pacjenta</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Imię" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Nazwisko" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Ulica" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Miasto" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Kod-Pocztowy" required></v-text-field>
            </v-flex>

            <v-flex xs6>
              <v-text-field label="Regon" type="number" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="NIP" type="number" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click.native="dialog = false">Dodaj Pacjenta</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {};
</script>

<style>
</style>
