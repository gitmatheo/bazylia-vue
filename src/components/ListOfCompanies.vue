<template>
  <v-layout row justify-center>
    <v-flex xs12 class="search-form white" mt-5>
      <h2>Lista Firm</h2>
      <v-expansion-panel my-2>
        <v-expansion-panel-content v-for="(company, i) in companies" :key="i">
          <template v-slot:header>
            <ul class="patient__header">
              <li>{{ company.name }}</li>
              <li>{{ company.secondName }}</li>
              <li>PESEL: {{ company.pesel }}</li>
              <li>{{ company.company }}</li>
            </ul>
          </template>
          <v-card>
            <ul ref="patient" class="patient__desc">
              <li>Imię: {{ company.name }}</li>
              <li>Nazwisko: {{ company.secondName }}</li>
              <li>Firma: {{ company.company }}</li>
              <li>PESEL: {{ company.pesel }}</li>
              <li>
                <v-btn class="customBtn">Rejestruj wizytę</v-btn>
                <v-btn class="customBtn white--text">Usuń Pacjenta</v-btn>
                <DialogBox>Usuń Pacjenta</DialogBox>
              </li>
            </ul>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogBox from '../components/DialogBox'
export default {
  components: {
    DialogBox
  },
  props: ['companies'],
  data: () => ({
    companies: []
  }),
  methods: {},
  mounted: function() {
    this.companies = this.$store.getters.getCompanies
  }
}
</script>

<style lang="scss">
.patient__header {
  display: flex;
  justify-content: space-between;
  li {
    padding-right: 20px;
  }
}

.patient__desc {
  background: darken(white, 5);
  padding-top: 2rem;
  li {
    padding: 3px 0;
  }
}
.customBtn {
  margin: 20px 10px 20px 0px;
}
</style>
