<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text class="display-1 px-0">Rejestracja Pacjenta</v-card-text>
          <ul class="patient-list">
            <li>Imię: {{pacjent.imie}}</li>
            <li>Nazwisko: {{pacjent.nazwisko}}</li>
            <li>PESEL: {{pacjent.pesel}}</li>
          </ul>
        </v-card>
        <v-card>
          <v-card-text class="display-1">Rodzaj Wizyty</v-card-text>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn color="error" class="custom-btn" large @click.native="updateTypWizyty(typWizytyConst.MEDYCYNA_PRACY)">
                <router-link to="/medycyna-pracy">Medycyna Pracy</router-link>
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn color="error" class="custom-btn" large @click.native="updateTypWizyty(typWizytyConst.SPECJALISTYKA)">
                <router-link to="/specjalistyka">Specjalistyka</router-link>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { mapState } from "vuex";
import { typWizytyConst } from '../constants/constants';
import { mapMutations } from 'vuex';



export default {
  data: () => ({
    pacjent: {},
    typWizytyConst: typWizytyConst
  }),
  mounted: function() {
    this.pacjent = this.$store.getters.getWizyta.pacjent;
  },
  methods: {
    ...mapMutations(["UPDATE_TYP_WIZYTY"]),
    updateTypWizyty(typWizyty) {
      this.UPDATE_TYP_WIZYTY(typWizyty)
    }
  }
};
</script>

<style lang="scss">
.patient-list {
  list-style: none;
  text-align: left;
  font-size: 1.2rem;
  padding: 25px;
}

.custom-btn {
  width: calc(100% - 50px);
  a {
    color: white;
  }
}
</style>
