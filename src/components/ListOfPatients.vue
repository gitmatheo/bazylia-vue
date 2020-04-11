<template>
  <v-layout row justify-center>
    <v-flex xs12 class="search-form white" pt-5>
      <h2>Lista pacjentów</h2>
      <Loader v-if="isLoading" />
      <v-expansion-panel v-if="!isLoading" my-2 class="patient elevation-0">
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
        <v-expansion-panel-content
          v-for="(patient, i) in visiblePatients"
          :key="i"
          :data-cy="`patient`"
        >
          <template v-slot:header>
            <ul class="patient__header patient__header--bold">
              <li>{{ patient.imie }}</li>
              <li>{{ patient.nazwisko }}</li>
              <li>{{ patient.pesel }}</li>
              <li class="patient__details-element">Szczegóły</li>
            </ul>
          </template>
          <v-card>
            <div class="patient__desc">
              <ul ref="patient" class="patient__desc-col">
                <li>
                  <span>Numer karty: </span>
                  <span>{{ patient.numerKarty }}</span>
                </li>
                <li>
                  <span>Ulica: </span>
                  <span>{{ patient.ulica }}</span>
                </li>
                <li>
                  <span>Miasto:</span>
                  <span>{{ patient.miasto }}</span>
                </li>
                <li>
                  <span>Kod-pocztowy:</span>
                  <span>{{ patient.kodPocztowy }}</span>
                </li>
                <li>
                  <span>Telefon: </span>
                  <span>{{ patient.numerTelefonu }}</span>
                </li>
                <li>
                  <span>Stanowisko: </span>
                  <span>{{ patient.stanowisko }}</span>
                </li>
                <li>
                  <span>NIP:</span>
                  <span>{{ patient.nip }}</span>
                </li>
                <li>
                  <span>Data orzeczenia: </span>
                  <span>{{ patient.dataOrzeczenia }}</span>
                </li>
              </ul>

              <!-- FIRMA -->
              <ul ref="patient" class="patient__desc-col">
                <li v-if="patient.firma">
                  <span>Firma: </span>
                  <span>{{ patient.firma.nazwa }}</span>
                </li>
              </ul>
            </div>

            <div class="patient__btns">
              <RegistrationPopUp :patient="patient"></RegistrationPopUp>
              <DeletePatientPopUp :patient="patient"
                >Usuń Pacjenta
                <v-icon class="icon-close" right @click="dialog = false"
                  >delete</v-icon
                ></DeletePatientPopUp
              >
            </div>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import RegistrationPopUp from '../components/RegistrationPopUp'
import DeletePatientPopUp from '../components/DeletePatientPopUp'
export default {
  components: {
    RegistrationPopUp,
    DeletePatientPopUp
  },
  props: ['patients', 'filteredPatients', 'visiblePatients', 'isLoading'],
  data: () => ({}),
  watch: {
    visiblePatients() {
      console.log('The visiblePatients have changed!')
    }
  }
}
</script>

<style lang="scss">
.patient {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  &__card {
    display: flex;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    padding: 0px;
    li {
      width: 25%;
      &:nth-child(2) {
        padding-left: 7px;
      }
      &:nth-child(3) {
        padding-left: 12px;
      }
    }

    &--bold {
      font-weight: bold;
    }
  }

  &__desc {
    display: flex;
    justify-content: space-between;
  }

  &__desc-col {
    padding-top: 2rem;
    width: 50%;
    padding-left: 0px;

    li {
      display: flex;
      padding-top: 8px;
      span {
        display: block;
        width: 50%;
      }
    }
  }

  &__btns {
    display: flex;
    padding: 10px 0px;
  }

  &__details-element {
    text-align: right;
    padding-right: 3px;
  }
}
</style>
