<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Wybierz firmę</h3>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-radio-group justify-center v-model="selection" @click="select(selection)">
          <v-radio label="Użyj Firmy / ostatnio wybrana" color="error" value="1"></v-radio>
          <div v-if="selection == 1">option 1: uzyj firmy domyslnej</div>
          <v-radio label="Użyj firmy z bazy danych" color="error" value="2"></v-radio>
          <div v-if="selection == 2">option 2: Uzyj firmy z bazy danych</div>

          <v-layout v-if="selection == 2" row justify-center>
            <v-flex xs12 class="search-form white" mt-5 elevation-5>
              <h2>Lista Firm</h2>
              <v-expansion-panel my-2>
                <v-expansion-panel-content v-for="(company,i) in companies" :key="i">
                  <template v-slot:header>
                    <ul class="patient__header">
                      <li>{{company.name}}</li>
                      <li>{{company.street}}</li>
                      <li>PESEL: {{company.pesel}}</li>
                      <li>{{company.city}}</li>
                    </ul>
                  </template>
                  <v-card>
                    <ul ref="patient" class="patient__desc">
                      <li>Imię: {{company.name}}</li>
                      <li>Nazwisko: {{company.secondName}}</li>
                      <li>Firma: {{company.company}}</li>
                      <li>PESEL: {{company.pesel}}</li>
                      <li>
                        <v-btn
                          color="success"
                          class="customBtn"
                          @click="register(i)"
                        >Rejestruj wizytę</v-btn>
                        <!-- <DialogBox
                  color="green"
                  :patients="patients[i]"
                  @click="deletePatient"
                        >Rejestruj wizytę</DialogBox>-->
                        <v-btn
                          color="red"
                          class="customBtn white--text"
                          @click="deletePatient(i)"
                        >Usuń Pacjenta</v-btn>
                        <DialogBox
                          color="red"
                          :patients="patients[i]"
                          @click="deletePatient"
                        >Usuń Pacjenta</DialogBox>
                      </li>
                    </ul>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>

          <v-radio label="Dodaj firmę" color="error" value="3"></v-radio>

          <AddCompany v-if="selection == 3"/>

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
import DialogBox from "../components/DialogBox";
export default {
  components: {
    DialogBox
  },
  props: ["patients", "deletePatient", "register"],
  data: () => ({
    companies: []
  }),
  methods: {},
  mounted: function() {
    this.companies = this.$store.getters.getCompanies;
  }
};
</script>

<script>
import AddCompany from "./AddCompany";
export default {
  components: {
    AddCompany
  },
  data() {
    return {
      companies: [],
      selection: null,
      selectedCompany: null
    };
  },
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
  }
};
</script>

<style>
</style>
