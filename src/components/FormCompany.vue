<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Wybierz firmę</h3>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-radio-group justify-center v-model="selection" @click="select(selection)">
          <v-radio label="Użyj Firmy / ostatnio wybrana" color="error" value="1"></v-radio>

          <v-radio label="Użyj firmy z bazy danych" color="error" value="2"></v-radio>

          <v-radio label="Dodaj firmę" color="error" value="3"></v-radio>

          <AddCompany v-if="selection == 3"/>
          <div v-if="selection == 1">option 1: uzyj firmy domyslnej</div>
          <v-layout v-if="selection == 2" row justify-center>
            <v-flex xs12>
              <v-form v-model="valid" lazy-validation>
                <v-container>
                  <v-layout>
                    <v-flex>
                      <v-text-field v-model="search" label="Nazwa Firmy"></v-text-field>
                      <v-btn :disabled="!valid" color="info">
                        <span>Szukaj</span>
                        <v-icon right>search</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>

              <h3>Lista Firm</h3>
              <v-expansion-panel my-2>
                <v-expansion-panel-content v-for="(company,i) in filteredCompanies" :key="i">
                  <template v-slot:header>
                    <ul class="patient__header">
                      <li>{{company.name}}</li>
                      <li>{{company.street}}</li>
                      <li>NIP: {{company.NIP}}</li>
                      <li>REGON: {{company.REGON}}</li>
                    </ul>
                  </template>
                  <v-card>
                    <ul ref="patient" class="patient__desc">
                      <li>Nazwa: {{company.name}}</li>
                      <li>Ulica: {{company.street}}</li>
                      <li>Miasto: {{company.city}}</li>
                      <li>Kod-pocztowy: {{company.postCode}}</li>
                      <li>REGON: {{company.REGON}}</li>
                      <li>NIP: {{company.NIP}}</li>
                      <li>Ryczałt: {{company.ryczalt}}</li>
                      <li>
                        <v-btn color="success" class="customBtn">Wybierz firmę</v-btn>
                      </li>
                    </ul>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>
          <!-- <v-card v-if="company == 3">
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
              <v-btn color="success" @click.native="dialog = false">Dodaj Firmę</v-btn>
            </v-card-actions>
          </v-card>-->
        </v-radio-group>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DialogBox from "./DialogBox";
import ListOfCompanies from "./ListOfCompanies";
import AddCompany from "./AddCompany";
export default {
  components: {
    DialogBox,
    ListOfCompanies
  },
  data: () => ({
    companies: [],
    selection: null,
    selectedCompany: null,
    search: "",
    valid: true
  }),
  methods: {
    select(company) {
      this.selectedCompany = company;

      this.$emit("update", {
        company: this.selectedCompany
      });
    }
  },
  mounted: function() {
    this.companies = this.$store.getters.getCompanies;
  },
  computed: {
    filteredCompanies: function() {
      return this.companies.filter(company => {
        return company.name.match(this.search);
      });
    }
  }
};
</script>



<style>
</style>
