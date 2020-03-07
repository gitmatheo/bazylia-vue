<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <!-- <my-button v-on="on">
          Rejestruj wizytę
        </my-button> -->
        <v-btn color="#20CE99" class="btnRegister" v-on="on">
          Rejestruj wizytę
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-3" primary-title>Rejestracja pacjenta.</v-card-title>
        <v-card-text >
          <div>
            Imię: {{patients.imie}}
          </div>
          <div>
            Nazwisko: {{patients.nazwisko}}
          </div>
          <div>
            PESEL: {{patients.pesel}}
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="actions">
          <my-button 
              color="#20CE99"
              fontColor="white"
              @click.native="onClickButton(typWizytyConst.MEDYCYNA_PRACY)"
              to="/medycyna-pracy">Medycyna Pracy</my-button>
          <my-button
              color="#20CE99"
              fontColor="white"
              @click.native="onClickButton(typWizytyConst.SPECJALISTYKA)"
              to="/specjalistyka">Specjalistyka</my-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import MyButton from "../components/MyButton";
import { typWizytyConst } from '../constants/constants';
import { mapMutations } from 'vuex';

export default {
  components: {
    MyButton
  },
  props: ["patients", "deletePatient", "color"],
  data() {
    return {
      dialog: false,
      typWizytyConst: typWizytyConst,
    };
  },
  methods: {
    ...mapMutations(['UPDATE_TYP_WIZYTY']),
    updateTypWizyty(typWizyty) {
      this.UPDATE_TYP_WIZYTY(typWizyty);
    },
    confirmDelete() {
      this.dialog = false;
    },
    cancelDelete() {
      this.dialog = false;
    },
    onClickButton (typWizyty) {
      console.log("typWizyty inside dialog box")
      console.log(typWizyty);
      this.updateTypWizyty(typWizyty)
      this.$emit('clicked', {
        ...this.patients,
      })
    }
  },
};
</script>

<style lang="scss">

.btnRegister {
    display: flex!important ;
    justify-content: center !important;
    align-items: center!important;
    background-color: #20CE99;
    color: white !important;
    height: 48px !important;
    width: 224px !important;
    border-radius: 50px !important;
    margin: 20px 0px !important;

    i {
      color: white !important // dlaczego kurwa important ?;
    }

    &--black {
      background-color: black !important;
    }
    &--red {
      background-color: #F44336 !important // dlaczego kurwa important ?;
    }
}


.v-dialog.v-dialog--active {
  border-radius: 10px;
}
.v-card__actions.actions{
  padding: 22px;
}
</style>
