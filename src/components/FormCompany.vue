<template>
  <v-container grid-list-md text-xs-center class="white">
    <h2>Rejestracja - Medycyna Pracy</h2>
    <h3>Wybierz firmę</h3>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-radio-group justify-center v-model="selection" @click="select(selection)">
          <v-radio label="Użyj Firmy / ostatnio wybrana" color="error" value="1"></v-radio>
          <v-radio label="Użyj firmy z bazy danych" color="error" value="2"></v-radio>
          <v-radio label="Dodaj firmę" color="error" value="3"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs6>
        <h3>Wybrana firma</h3>
        <ul class="company-desc">
          <li>
            Nazwa:
            <span class="font-weight-medium font-italic">{{company.name}}</span>
          </li>
          <li>
            Ulica:
            <span class="font-weight-medium font-italic">{{company.street}}</span>
          </li>
          <li>
            Miasto:
            <span class="font-weight-medium font-italic">{{company.city}}</span>
          </li>
          <li>
            Kod-Pocztowy:
            <span class="font-weight-medium font-italic">{{company.postCode}}</span>
          </li>
          <li>
            NIP:
            <span class="font-weight-medium font-italic">{{company.NIP}}</span>
          </li>
          <li>
            REGON:
            <span class="font-weight-medium font-italic">{{company.REGON}}</span>
          </li>
          <li>
            Ryczałt:
            <span class="font-weight-medium font-italic">{{company.ryczalt}}</span>
          </li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <!-- <AddCompany v-if="selection == 3"/> -->

        <h2 v-if="selection == 1" class="headline">option 1: uzyj firmy domyslnej</h2>
        <v-layout v-if="selection == 2" row justify-center>
          <v-flex xs12>
            <h2 class="headline">Wybierz firmę z bazy</h2>
            <v-form v-model="valid" lazy-validation>
              <v-container>
                <v-layout>
                  <v-flex xs3>
                    <v-text-field v-model="nameSearch" label="Nazwa Firmy"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field v-model="NIPSearch" label="NIP"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field v-model="REGONSearch" label="REGON"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-btn :disabled="!valid" color="info">
                      <span>Szukaj</span>
                      <v-icon right>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>

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
                      <v-btn
                        color="success"
                        class="customBtn"
                        @click="selectCompany(i)"
                      >Wybierz firmę</v-btn>
                    </li>
                  </ul>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>

        <v-form v-if="selection == 3" v-model="valid">
          <v-container grid-list-md>
            <h2 class="headline">Dodaj Firmę</h2>
            <v-layout wrap flex>
              <v-flex xs12 md6>
                <v-text-field label="Nazwa Firmy" v-model="searchCompany.name"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Ulica" v-model="searchCompany.street"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Miasto" v-model="searchCompany.city"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Kod-Pocztowy" v-model="searchCompany.zipCode"></v-text-field>
              </v-flex>

              <v-flex xs12 md6>
                <v-text-field label="Regon" type="number" v-model="searchCompany.REGON"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="NIP" type="number" v-model="searchCompany.NIP"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select :items="['TAK', 'NIE']" label="Ryczałt" v-model="searchCompany.ryczalt"></v-select>
              </v-flex>
              <v-flex xs12>
                <v-btn color="success" @click.native="addNewCompany(searchCompany)">Dodaj Firmę</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import DialogBox from "./DialogBox";
// import ListOfCompanies from "./ListOfCompanies";
// import AddCompany from "./AddCompany";
import { mapMutations } from "vuex";
export default {
  components: {
    // DialogBox,
    // ListOfCompanies,
    // AddCompany
  },
  data: () => ({
    companies: [],
    searchCompany: {
      name: "",
      street: "",
      city: "",
      zipCode: "",
      NIP: "",
      REGON: "",
      ryczalt: "",
      id: null
    },
    company: {},
    selection: null,
    selectedCompany: null,
    nameSearch: "",
    NIPSearch: "",
    REGONSearch: "",
    valid: true
  }),
  methods: {
    select(selection) {
      this.selectedCompany = selection;
    },
    updateCompany() {
      this.$emit("update", {
        company: this.company
      });
    },
    ...mapMutations(["ADD_COMPANY"]),
    addNewCompany(payload) {
      this.searchCompany.id = this.companies.length + 1;
      this.ADD_COMPANY(payload);
      this.company = { ...this.searchCompany };
      this.updateCompany();
      this.clearForm();
    },
    clearForm() {
      this.searchCompany.name = "";
      this.searchCompany.street = "";
      this.searchCompany.city = "";
      this.searchCompany.zipCode = "";
      this.searchCompany.NIP = "";
      this.searchCompany.REGON = "";
      this.searchCompany.ryczalt = "";
    },
    addToSelected() {},
    selectCompany(index) {
      const {
        id,
        name,
        street,
        city,
        zipCode,
        NIP,
        REGON,
        ryczalt
      } = this.companies[index];
      const company = {
        id,
        name,
        street,
        city,
        zipCode,
        NIP,
        REGON,
        ryczalt
      };

      this.company = { ...company };
      this.updateCompany();
    }
  },
  updated: function() {
    this.patientForReg.company = this.company;
  },

  mounted: function() {
    this.patientForReg = this.$store.getters.getPatientForReg;
    this.companies = this.$store.getters.getCompanies;

    console.log("FormDatePicker - MOUNTED");
    console.log(this.patientForReg);
  },
  computed: {
    filteredCompanies: function() {
      return this.companies.filter(company => {
        return (
          company.name.match(this.nameSearch) &&
          company.NIP.match(this.NIPSearch) &&
          company.REGON.match(this.REGONSearch)
        );
      });
    }
  }
};
</script>



<style>
.company-desc {
  list-style: none;
  text-align: left;
}
</style>
