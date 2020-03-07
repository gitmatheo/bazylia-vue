<template>
  <v-layout row justify-center>
    <v-flex xs12 class="search-form white" pt-5>
      <h2>Lista pacjentów</h2>
      <v-expansion-panel my-2 class="patient elevation-0">
          <v-expansion-panel-content>
          <template v-slot:header>
            <ul class="patient__header">
              <li>Imię</li>
              <li>Nazwisko</li>
              <li>Pesel</li>
              <li></li>
            </ul>
          </template>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-for="(patient,i) in filteredPatients" :key="i">
          <template v-slot:header>
            <ul class="patient__header">
              <li>{{patient.imie}}</li>
              <li>{{patient.nazwisko}}</li>
              <li>PESEL: {{patient.pesel}}</li>
              <li>Szczegóły</li>
            </ul>
          </template>
          <v-card>
            <ul ref="patient" class="patient__desc">
              <li>Imię: {{patient.imie}}</li>
              <li>Nazwisko: {{patient.nazwisko}}</li>
              <li>Firma: {{patient.company}}</li>
              <!-- <li>PESEL: {{patient.pesel}}</li> -->

            </ul>
            <div class="patient__btns">
               
                <RegistrationPopUp
                  :patients="patients[i]"
                  @click="register(i)"
                  @clicked="updateTypWizyty($event)"
                >Rejestruj wizytę</RegistrationPopUp>
                <DeletePatientPopUp :patients="patients[i]" @click="deletePatient">Usuń Pacjenta</DeletePatientPopUp>
             </div>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
// import MyButton from "../components/MyButton";
import RegistrationPopUp from "../components/RegistrationPopUp";
import DeletePatientPopUp from "../components/DeletePatientPopUp";
export default {
  components: {
    RegistrationPopUp,
    DeletePatientPopUp
    // MyButton
  },
    props: ["patients", "deletePatient", "register", "filteredPatients"],
  data: () => ({}),
  methods: {
    updateTypWizyty($event) {
      console.log("event ListOfPatients dialog box")
      console.log($event);
    }
  }
};
</script>

<style lang="scss">


.patient {
  border-bottom: 1px solid rgba(0,0,0, 0.2);


  &__btns {
    display: flex;
    padding: 10px;
    button {
      &:nth-child(2){
        margin-left: 36px;
      }
    }
  }
}
.patient__header {
  display: flex;
  list-style: none;
  justify-content: space-between;
  li {
    padding-right: 20px;
  }
}

.patient__desc {
  list-style: none;
  padding-top: 2rem;
  li {
    padding: 3px 0;
  }
}

.my-btn {
    background-color: #20CE99;
    color: white;
    height: 48px;
    width: 224px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    i {
      color: white !important // dlaczego kurwa important ?;
    }

    &--black {
      background-color: black;
    }
    &--red {
      background-color: #F44336 !important // dlaczego kurwa important ?;
    }
}

</style>
