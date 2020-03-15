<template>
  <v-container class="white search-form " my-4>
    <h2 class="font-weight-light">
      Pacjenci bez zaświadczenia
      <span class="font-weight-bold">{{ patients.length }}</span>
    </h2>

    <v-layout row mt-5>
      <v-flex xs12 justify-center pb-4>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Wystaw fakturę</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title
              >Wystawianie faktury</v-card-title
            >
            <v-card-text>Data dostawy lub wykonania usługi:</v-card-text>
            <v-divider></v-divider>
            <v-container>
              <v-radio-group>
                <v-flex row>
                  <v-radio
                    v-for="item in dateOfDelivery"
                    :key="item"
                    :label="`${item}`"
                    :value="item"
                  ></v-radio>
                </v-flex>
              </v-radio-group>

              <v-divider></v-divider>
              <v-card-text>Termin zapłaty:</v-card-text>
              <v-radio-group>
                <v-radio
                  v-for="item in dateOfPayment"
                  :key="item"
                  :label="`${item}`"
                  :value="item"
                ></v-radio>
              </v-radio-group>
              <v-card-text>Sposób zapłaty:</v-card-text>
              <v-radio-group>
                <v-radio
                  v-for="item in methodOfPayment"
                  :key="item"
                  :label="`${item}`"
                  :value="item"
                ></v-radio>
              </v-radio-group>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="dialog = false">Anuluj</v-btn>
                <v-btn flat @click="dialog = false">Wystaw Fakturę</v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <v-expansion-panel>
      <v-expansion-panel-content v-for="(item, i) in 5" :key="i">
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.company }}</td>
          <td>{{ props.item.secondName }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.pesel }}</td>
          <td>{{ props.item.serviceName }}</td>
          <td>
            <v-btn v-if="props.item.invoice == null">brak fv</v-btn>
            <v-btn v-else class="info">{{ props.item.invoice }}</v-btn>
          </td>
        </template>
        <v-card>
          <v-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.</v-card-text
          >
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-data-table :headers="headers" :items="patients" class="">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.company }}</td>
        <td>{{ props.item.secondName }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.pesel }}</td>
        <td>{{ props.item.serviceName }}</td>
        <td>
          <v-btn v-if="props.item.invoice == null">brak fv</v-btn>
          <v-btn v-else class="info">{{ props.item.invoice }}</v-btn>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      dateOfDelivery: ['cały miesiąc', 'data wystawienia faktury'],
      dateOfPayment: ['7 dni', '14 dni', '30 dni'],
      methodOfPayment: ['gotówka', 'przelew'],
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Firma', value: 'company' },
        { text: 'Nazwisko', value: 'secondName' },
        { text: 'Imię', value: 'name' },
        { text: 'PESEL', value: 'pesel' },
        { text: 'Nazwa usługi', value: 'serviceName' },
        { text: 'Faktura', value: 'invoice' }
      ],
      patients: [
        {
          id: 1,
          company: "Mc Donalds's",
          name: 'Zdzislaw',
          secondName: 'Brzeczyszczykiewicz',
          pesel: '1223124',
          serviceName: 'badanie1',
          invoice: '308/2018'
        },
        {
          id: 2,
          company: 'ABC',
          name: 'Waldek',
          secondName: 'Kowalski',
          pesel: '3123124',
          serviceName: 'badanie1123',
          invoice: '308/2018'
        },
        {
          id: 3,
          company: 'ZYS',
          name: 'Adam',
          secondName: 'Nowak',
          pesel: '7673124',
          serviceName: 'badanie144',
          invoice: null
        },
        {
          id: 4,
          company: 'Jaks firma',
          name: 'Cypsztyk',
          secondName: 'Pacynski',
          pesel: '9823124',
          serviceName: 'badanie12',
          invoice: '308/2018'
        }
      ]
    }
  }
}
</script>

<style lang="scss"></style>
