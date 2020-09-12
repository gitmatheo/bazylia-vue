<template>
  <v-app>
    <!-- <v-layout row mt-5>
      <v-flex xs12 justify-center>
        <div class="text-xs-center">
          <v-btn color="success" @click="printInvoice('section-to-print')">Drukuj Fakturę</v-btn>
        </div>
      </v-flex>
    </v-layout>-->
    <v-container id="section-to-print" class="white container" my-5>
      <v-layout row>
        <v-flex xs7>
          <p>ZOZ "BAZYLIA" SPECJALISTYCZNE USŁUGI MEDYCZNE</p>
          <p>ul. A. Struga 23, 95-100 Zgierz</p>
          <p>NIP: 735-151-40-46</p>
          <p>Nr konta: 21 1020 3440 0000 7802 0013 9329</p>
          <p>Bank: PKO BP S.A o/Zgierz</p>
        </v-flex>
        <v-flex xs5 class="details">
          <div>
            <p class="details__element">
              <span>Data wystawienia:</span>
              <span>{{ faktura.dataFaktury | moment('DD-MM-YYYY') }}</span>
            </p>
            <p class="details__element">
              <span>Miejsce wystawienia:</span>
              <span>Zgierz</span>
            </p>
            <p class="details__element">
              <span>Data wykonania usługi:</span>
              <span>{{ faktura.dataUslugi | moment('DD-MM-YYYY') }}</span>
            </p>
            <p class="details__element">
              <span>Termin płatności:</span>
              <span>{{ terminPlatnosci }}</span>
            </p>
            <p class="details__element">
              <span>Sposób płatności:</span>
              <span>{{ sposobPlatnosci }}</span>
            </p>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row class="invoice-number">
        <v-flex xs12>
          <div class="invoice-title">
            <h2>
              Faktura VAT nr:
              <span>{{ faktura.numerFaktury }}</span>
            </h2>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row pb-5>
        <v-flex xs7 class="seller">
          <h2>Sprzedawca</h2>
          <p>
            <br />ZOZ "BAZYLIA" SPECJALISTYCZNE USŁUGI MEDYCZNE <br />ul. A.
            Struga 23, 95-100 Zgierz <br />NIP: 735-151-40-46 <br />Nr konta: 21
            1020 3440 0000 7802 0013 9329 <br />Bank: PKO BP S.A o/Zgierz
          </p>
        </v-flex>

        <v-flex xs5 class="buyer">
          <h2>Nabywca</h2>
          <p>
            <br />
            {{ faktura.platnik.nazwa }}
            <br />
            <span>ul.</span>
            {{ faktura.platnik.ulica }}
            <br />
            {{ faktura.platnik.kodPocztowy }}, {{ faktura.platnik.miasto }}
            <br />
            <span>NIP:</span>
            {{ faktura.platnik.nip }}
          </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-data-table
            dense
            :headers="headers"
            :items="faktura.uslugi"
            hide-actions
            class=""
          >
            <template v-slot:items="props">
              <td>{{ props.index + 1 }}</td>
              <!-- Lp -->
              <td>{{ props.item.nazwa }}</td>
              <!-- nazwa -->
              <td>{{ props.item.pkwiu }}</td>
              <!-- pkwiu -->
              <td>{{ props.item.ilosc }}</td>
              <!-- ilosc -->
              <td>{{ props.item.cenaNetto }}</td>
              <!-- cenaNetto -->
              <td>{{ props.item.wartoscNetto }}</td>
              <!-- Wartosc netto -->
              <td>{{ props.item.stawkaVat + '%' }}</td>
              <!-- Stawka VAT -->
              <td>{{ props.item.wartoscVat }}</td>
              <!-- wartosc VAT -->
              <td>{{ props.item.wartoscBrutto }}</td>
              <!-- wartosc Brutto -->
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>

      <v-layout row justify-end py-5>
        <v-flex xs5>
          <h3>Do zapłaty: {{ faktura.sumaBrutto }} zł</h3>
          <p>Słownie: {{ kwotaSlownie }}</p>
        </v-flex>
      </v-layout>
      <v-layout row justify-space-around py-5>
        <v-flex xs4 class="text-sm-center">
          <p>
            ..........................................................................
          </p>
          <p>Podpis osoby upoważnionej do wystawienia dokumentu</p>
        </v-flex>
        <v-flex xs4 class="text-sm-center">
          <p>
            ..................................................................
          </p>
          <p>Podpis osoby upoważnionej do odbioru dokumentu</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="container">
      <v-layout row justify-center>
        <my-button fontColor="black" @click.native="goBack()" color="white"
          >Wstecz</my-button
        >
        <my-button fontColor="white" color="#20CE99">Drukuj</my-button>
        <SendMailPopup v-if="faktura.platnik.email" :faktura="faktura"
          >Email
          <v-icon class="icon-close" right @click="dialog = false">
            email
          </v-icon>
        </SendMailPopup>
        <my-button
          @click.native="downloadPdf(faktura.fakturaId)"
          fontColor="white"
          color="info"
          >Zapisz PDF
          <v-icon>description</v-icon>
        </my-button>
        <my-button
          @click.native="openSpecification(faktura.fakturaId)"
          fontColor="white"
          color="black"
          >Specyfikacja</my-button
        >
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import apiService from '@/services/apiService.js'
import slownie from '../utils/slownie.js'
import SendMailPopup from '../components/SendMailPopup'

export default {
  components: {
    SendMailPopup
  },
  data() {
    return {
      headers: [
        {
          text: 'Lp',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Nazwa', value: 'nazwa' },
        { text: 'PKWiU', value: 'pkwiu' },
        { text: 'Ilość', value: 'quantity' },
        { text: 'Cena netto', value: 'cena' },
        { text: 'Wartość netto', value: 'beforeTaxValue' },
        { text: 'Stawka VAT', value: 'vat' },
        { text: 'Wartość VAT', value: 'vatValue' },
        { text: 'Wartość brutto', value: 'afterTaxValue' }
      ],
      patients: [
        {
          lp: 4,
          serviceName: 'badadanie12',
          pkwiu: '',
          quantity: 1,
          beforeTaxPrice: 46.2,
          beforeTaxValue: 46.2,
          vat: '23%',
          vatValue: 13.8,
          afterTaxValue: 60
        }
      ],
      faktura: {
        fakturaId: '41a19660-f72d-45b1-a881-5c09fa1022e9',
        nrFaktury: '324/2020/F',
        platnik: {
          firmaId: '9aba4d00-d551-4dfe-9df0-551e8312a7d3',
          nazwa: "Mc Donald's",
          ulica: 'Armii Krajowej 123',
          miasto: 'Zgierz',
          kodPocztowy: '95-100',
          nip: '15002900',
          ryczalt: 21
        },
        uslugi: [
          {
            uslugaId: 'af25c768-c915-4242-a1fb-fbb9b1bc1ef9',
            nazwa: 'Badanie krwi',
            cenaNetto: 66,
            pkwiu: 'string',
            ilosc: 22,
            stawkaVat: 23
          },
          {
            uslugaId: 'af25c768-c915-4242-a1fb-fbb9b1bc1ef9',
            nazwa: 'Badanie krwi',
            cenaNetto: 66,
            pkwiu: 'string',
            ilosc: 22,
            stawkaVat: 23
          },
          {
            uslugaId: 'af25c768-c915-4242-a1fb-fbb9b1bc1ef9',
            nazwa: 'Badanie krwi',
            cenaNetto: 66,
            pkwiu: 'string',
            ilosc: 22,
            stawkaVat: 23
          }
        ],
        suma: 452,
        dataFaktury: '2020-01-26T11:11:14.491092',
        terminPlatnosci: 14,
        sposobPlatnosci: 'GOTOWKA'
      }
    }
  },
  mounted: function() {
    const fakturaId = this.$route.params.id
    apiService.getInvoice(fakturaId).then(response => {
      this.$store.commit('GET_FAKTURA', response.data)
      this.faktura = this.$store.getters.getFaktura

      this.faktura.uslugi.map(usluga => {
        usluga.wartoscNetto = usluga.cenaNetto * usluga.ilosc

        usluga.wartoscVat =
          usluga.stawkaVat == 0
            ? 0
            : parseFloat(
                ((usluga.wartoscNetto * usluga.stawkaVat) / 100).toFixed(2)
              )

        usluga.wartoscBrutto =
          usluga.stawkaVat == 0
            ? usluga.wartoscNetto
            : parseFloat((usluga.wartoscNetto + usluga.wartoscVat).toFixed(2))
      })
    })
  },
  methods: {
    // printInvoice(divName) {
    //   const printContents = document.getElementById(divName).innerHTML;
    //   const originalContents = document.body.innerHTML;
    //   document.body.innerHTML = printContents;
    //   window.print();
    //   document.body.innerHTML = originalContents;
    // }
    openSpecification(fakturaId) {
      this.$router.push({ path: `/specyfikacja/${fakturaId}` })
    },
    downloadPdf(fakturaId) {
      apiService.getPdf(fakturaId)
    },
    goBack() {
      this.$router.back()
    }
  },
  computed: {
    terminPlatnosci() {
      return this.$moment(this.faktura.dataFaktury)
        .add(this.faktura.terminPlatnosci, 'days')
        .format('DD-MM-YYYY')
    },
    sposobPlatnosci() {
      return this.faktura.sposobPlatnosci == 'GOTOWKA' ? 'Gotówka' : 'Przelew'
    },
    kwotaSlownie() {
      let kwota = this.faktura.sumaBrutto.split('.')
      let zlote = kwota[0]
      let grosze = kwota[1]
      return `${slownie(zlote)} zł i ${slownie(grosze)} gr `
    }
  }
}
</script>

<style lang="scss">
@page {
  size: auto;
  margin: 0mm;
  background: yellowgreen !important;
}

#section-to-print {
  width: calc(210px * 4);
  height: calc(297px * 4);
}

@media print {
  body {
    margin-top: -162px;
  }
  body * {
    margin: 0px;
    visibility: hidden;
  }
  #section-to-print,
  #section-to-print * {
    visibility: visible;
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}

.v-datatable thead th.column.sortable {
  padding: 5px;
}

table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 5px;
}

p {
  margin: 0px;
}

.invoice-number {
  padding: 50px 0;
}

.details {
  &__element {
    display: flex;
    justify-content: space-between;
  }
}

.buyer {
  p {
    margin-left: 15px;
  }
}

.seller {
  p {
    margin-left: 15px;
  }
}
</style>
