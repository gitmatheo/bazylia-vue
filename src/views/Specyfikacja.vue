<template>
  <v-app>
    <v-container id="section-to-print" class="white container" my-5>
      <div class="specyfikacja__wrapper">
        <v-layout row class="specyfikacja__headers">
          <h2>Zgierz, ??DATA??</h2>
          <h2>
            specyfikacja usług medycznych dla {{ faktura.nazwaFirmy }} do
            faktury: {{ faktura.numerFaktury }}
          </h2>
          <h3>Raport za miesiące: sierpień 2019 - styczeń 2020</h3>
        </v-layout>

        <v-layout row class="list">
          <ul class="list__header">
            <li>L.P.</li>
            <li>Imię i nazwisko pacjenta.</li>
            <li>Firma</li>
            <li>Nr karty lub PESEL</li>
            <li>Wykonana usługa</li>
            <li>Data usługi</li>
            <li>Kwota</li>
          </ul>

          <ul
            v-for="item in faktura"
            :key="item.pacjentId"
            class="list__patients"
          >
            <li>1</li>
            <li>{{ item.pacjent.imie }} {{ item.pacjent.nazwisko }}</li>
            <li>
              {{
                item.pacjent.nazwaPracodawcy ||
                  '-------------------------------'
              }}
            </li>
            <li>{{ item.pacjent.pesel || item.pacjent.numerKarty }}</li>
            <li>
              <ul v-for="usluga in item.wizyty" :key="usluga.uslugaId">
                <li class="list__usluga">{{ usluga.usluga.nazwa }}</li>
              </ul>
            </li>
            <li>
              <ul v-for="usluga in item.wizyty" :key="usluga.uslugaId">
                <li class="list__usluga">
                  {{ usluga.dataWizyty | moment('MM-DD-YYYY') }}
                </li>
              </ul>
            </li>
            <li>20zł</li>
          </ul>
        </v-layout>
      </div>
      <!-- <pre>{{ faktura }}</pre> -->
    </v-container>
    <v-container class="container">
      <v-layout row justify-center>
        <my-button fontColor="black" :to="`/invoice/${fakturaId}`" color="white"
          >Wstecz</my-button
        >
        <my-button fontColor="white" color="#20CE99">Drukuj</my-button>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    faktura: null,
    fakturaId: null
  }),
  mounted: function() {
    this.fakturaId = this.$route.params.id
    apiService.getSpecification(this.fakturaId).then(response => {
      this.faktura = response.data
    })
  },
  methods: {}
}
</script>

<style lang="scss">
.specyfikacja {
  &__wrapper {
    padding: 50px;
  }

  &__headers {
    h2,
    h3 {
      padding: 20px 0px;
    }
  }
}

.list {
  display: flex;
  flex-direction: column;
  &__header {
    font-weight: bold;
    display: grid;
    padding: 0px;
    grid-template-columns: 35px 220px 250px 150px 320px 130px 100px;

    li {
      border: 1px solid black;
      border-right: none;
      padding: 20px 0 3px 5px;
      &:last-of-type {
        border-right: 1px solid black;
      }
    }
  }

  &__patients {
    display: grid;
    grid-template-columns: 35px 220px 250px 150px 320px 130px 100px;
    padding: 0px;

    li {
      border: 1px solid black;
      border-top: none;
      border-right: none;
      padding: 5px;

      &:last-of-type {
        border-right: 1px solid black;
      }
    }
  }

  &__usluga {
    border: none !important;
    padding: 0px !important;
  }
}
</style>
