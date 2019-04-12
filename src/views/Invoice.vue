<template>
  <v-app>
    <v-layout row mt-5>
      <v-flex xs12 justify-center>
        <div class="text-xs-center">
          <v-btn color="success" @click="printInvoice('printableArea')">Drukuj Fakturę</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-container id="printableArea" class="white" my-5 elevation-2>
      <v-layout row>
        <v-flex xs12>
          <div class="invoice-title">
            <h2>Faktura VAT</h2>
            <h3>nr: 12345</h3>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <address>
            <br>Zakład Opieki Zdrowotnej "Bazylia"
            <br>Specjalistyczne Usługi Medyczne
            <br>ul. A. Struga 23
            <br>95-100 Zgierz
            <br>NIP: 735-151-40-46
            <br>
            <strong>Faktura Nr 308/2019</strong>
          </address>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <address>
            <strong>Nabywca</strong>
            <br>Data wystawienia: 2018-12-29
            <br>Miejsce wystawienia: ZGIERZ
            <br>Data wykonania usługi: 2018-12-29
            <br>Termin zapłaty: 2019-01-12
            <br>Sposób zapłaty: Gotówka
          </address>
        </v-flex>
      </v-layout>
      <br>

      <br>
      <v-layout row pb-5>
        <v-flex xs6>
          <address>
            <strong>Sprzedawca</strong>
            <br>Zakład Opieki Zdrowotnej "Bazylia"
            <br>Specjalistyczne Usługi Medyczne
            <br>ul. A. Struga 23
            <br>95-100 Zgierz
            <br>NIP: 735-151-40-46
          </address>
        </v-flex>

        <v-flex xs6 class="text-xs-right">
          <address>
            <strong>Nabywca</strong>
            <br>Jan Kowalski
            <br>ul. Długa 2
            <br>95-100
          </address>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-data-table :headers="headers" :items="patients" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.lp }}</td>
              <td>{{ props.item.serviceName }}</td>
              <td>{{ props.item.pkwiu }}</td>
              <td>{{ props.item.quantity }}</td>
              <td>{{ props.item.beforeTaxPrice }}</td>
              <td>{{ props.item.beforeTaxValue }}</td>
              <td>{{ props.item.vat }}</td>
              <td>{{ props.item.vatValue }}</td>
              <td>{{ props.item.afterTaxValue }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>

      <v-layout row justify-end py-5>
        <v-flex xs3>
          <h3>Do zapłaty 200zł</h3>
          <p>Słownie: dwieście złotych</p>
        </v-flex>
      </v-layout>
      <v-layout row justify-space-around py-5>
        <v-flex xs4 class="text-sm-center">
          <p>..........................................................................</p>
          <p>Podpis osoby upoważnionej do wystawienia dokumentu</p>
        </v-flex>
        <v-flex xs4 class="text-sm-center">
          <p>..................................................................</p>
          <p>Podpis osoby upoważnionej do odbioru dokumentu</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Lp",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Nazwa", value: "serviceName" },
        { text: "PKWiU", value: "pkwiu" },
        { text: "Ilość", value: "quantity" },
        { text: "Cena netto", value: "beforeTaxPrice" },
        { text: "Wartość netto", value: "beforeTaxValue" },
        { text: "Stawka VAT", value: "vat" },
        { text: "Wartość VAT", value: "vatValue" },
        { text: "Wartość brutto", value: "afterTaxValue" }
      ],
      patients: [
        {
          lp: 1,
          serviceName: "badanie1",
          pkwiu: "",
          quantity: 2,
          beforeTaxPrice: 46.2,
          beforeTaxValue: 46.2,
          vat: "23%",
          vatValue: 13.8,
          afterTaxValue: 60
        },
        {
          lp: 2,
          serviceName: "badanie1123",
          pkwiu: "",
          quantity: 3,
          beforeTaxPrice: 46.2,
          beforeTaxValue: 46.2,
          vat: "23%",
          vatValue: 13.8,
          afterTaxValue: 60
        },
        {
          lp: 3,
          serviceName: "badanie144",
          pkwiu: "",
          quantity: 1,
          beforeTaxPrice: 46.2,
          beforeTaxValue: 46.2,
          vat: "23%",
          vatValue: 13.8,
          afterTaxValue: 60,
          name: "Adam"
        },
        {
          lp: 4,
          serviceName: "badanie12",
          pkwiu: "",
          quantity: 1,
          beforeTaxPrice: 46.2,
          beforeTaxValue: 46.2,
          vat: "23%",
          vatValue: 13.8,
          afterTaxValue: 60
        }
      ]
    };
  },
  methods: {
    printInvoice(divName) {
      const printContents = document.getElementById(divName).innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  }
};
</script>

<style>
</style>
