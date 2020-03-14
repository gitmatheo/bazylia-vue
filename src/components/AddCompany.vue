<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" dark>Dodaj Firmę</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Dodaj Firmę</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Nazwa Firmy" required></v-text-field>
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
              <v-flex xs12>
                <v-select :items="['TAK', 'NIE']" label="Ryczałt" required></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="dialog = false">wstecz</v-btn>
          <v-btn @click.native="dialog = false">Dodaj Firmę</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>

<style lang="scss">
.container {
  max-width: 1360px !important;
}
</style>
