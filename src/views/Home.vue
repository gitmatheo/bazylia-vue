<template>
  <div class="home">
    <v-container>
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
            <!-- <v-btn color="info">Wszystkie</v-btn> -->
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs12 class="search-form white" mt-5 elevation-5>
          <h2>Lista pacjentów</h2>

          <v-expansion-panel my-2>
            <v-expansion-panel-content v-for="(item,i) in 10" :key="i">
              <template v-slot:header>
                <ul class="flex">
                  <li>Jan</li>
                  <li>Kowalski</li>
                  <li>PESEL: 342234234312</li>
                  <li>CoolSoft</li>
                </ul>
              </template>
              <v-card>
                <ul>
                  <li>Imię: Jan</li>
                  <li>Nazwisko: Kowalski</li>
                  <li>Firma: CoolSoft</li>
                  <li>PESEL: 12345678912</li>
                </ul>

                <v-btn color="success">Rejestruj wizytę</v-btn>
                <v-btn color="error">Usuń Pacjenta</v-btn>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
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

<style lang="scss">
.search-form {
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 10px 0 20px 0;
  }
}

.flex {
  display: flex;
  text-decoration: none;
  list-style: none;
  justify-content: space-between;

  li {
    padding-right: 20px;
  }
}
</style>
