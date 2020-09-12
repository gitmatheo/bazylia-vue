<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
      <h1 class="invoices__header">Faktury</h1>
      <div class="invoices">
        <ul>
          <li class="invoices__element--header">
            <div>Number faktury</div>
            <div>Nazwa firmy</div>
            <div>Data faktury</div>
            <div>Data usługi</div>
          </li>
          <li
            v-for="invoice in visibleInvoices"
            :key="invoice.fakturaId"
            class="invoices__element"
            @click="goToInvoice(invoice.fakturaId)"
          >
            <div>{{ invoice.numerFaktury }}</div>
            <div>{{ invoice.firma }}</div>
            <div>{{ invoice.dataFaktury | moment('DD-MM-YYYY') }}</div>
            <div>{{ invoice.dataUslugi }}</div>
          </li>
        </ul>
      </div>

      <div class="pagination">
        <v-pagination
          v-model="currentPage"
          :page="currentPage"
          :length="
            Math.floor(
              invoices.length % pageSize == 0
                ? invoices.length / pageSize
                : invoices.length / pageSize + 1
            )
          "
          @click.native="updateVisibleVisits"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    isLoading: true,
    invoices: false,
    visibleInvoices: [],
    currentPage: 1,
    pageSize: 15
  }),
  mounted: function() {
    const invoicesInStore = this.$store.getters.getAllInvoices

    if (invoicesInStore) {
      this.invoices = invoicesInStore
    } else {
      apiService.getAllInvoices().then(response => {
        if (response.data.length) {
          this.$store.commit('GET_ALL_INVOICES_FROM_DB', response.data)
          this.invoices = this.$store.getters.getAllInvoices
          this.isLoading = false
        } else {
          this.brakDanychMessage = 'Brak faktur w bazie'
        }
      })
    }
    this.updateVisibleVisits()
  },
  methods: {
    goToInvoice(fakturaId) {
      this.$router.push({ path: `/invoice/${fakturaId}` })
    },
    updateVisibleVisits() {
      let begin = this.currentPage * this.pageSize - this.pageSize
      let end = begin + this.pageSize
      this.visibleInvoices = this.invoices.slice(begin, end)
    }
  }
}
</script>

<style lang="scss">
.invoices {
  &__header {
    padding: 20px 0px;
  }
  &__element--header,
  &__element {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid darkgrey;
    cursor: pointer;
    transition: background-color 0.2s ease;
    div {
      width: 25%;
      &:last-of-type {
        text-align: right;
      }
    }

    &:hover {
      background-color: #eee;
    }

    &--header {
      font-weight: bold;
    }
  }
}
</style>
