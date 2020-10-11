<template>
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
        @click.native="switchView(faktura.fakturaId)"
        fontColor="white"
        color="black"
        >{{ getButtonName() }}
      </my-button>
    </v-layout>

    <v-container id="section-to-print" class="white container" my-5>
      <pdf
        :src="{
          url: getPdfUrl(faktura.fakturaId),
          withCredentials: true
        }"
      ></pdf>
    </v-container>
  </v-container>
</template>

<script>
import apiService from '@/services/apiService.js'
import API from '@/constants/api'
import SendMailPopup from '@/components/SendMailPopup'
import pdf from 'vue-pdf'

export default {
  components: {
    SendMailPopup,
    pdf
  },
  data() {
    return {
      faktura: {}
    }
  },
  props: {
    buttonName: String,

    componentType: String
  },
  mounted: function() {
    const fakturaId = this.$route.params.id

    apiService.getInvoice(fakturaId).then(response => {
      this.$store.commit('GET_FAKTURA', response.data)
      this.faktura = this.$store.getters.getFaktura
    })
  },
  methods: {
    getButtonName() {
      if (this.componentType == 'faktura') {
        return `specyfikacja`
      }
      if (this.componentType == 'specyfikacja') {
        return `faktura`
      }
    },
    switchView(fakturaId) {
      if (this.componentType == 'faktura') {
        this.$router.push({ path: `/specyfikacja/${fakturaId}` })
      }
      if (this.componentType == 'specyfikacja') {
        this.$router.push({ path: `../faktury/${fakturaId}` })
      }
    },
    downloadPdf(fakturaId) {
      if (this.componentType == 'faktura') {
        apiService.getFakturaPdf(fakturaId)
      }
      if (this.componentType == 'specyfikacja') {
        apiService.getSpecyfikacjaPdf(fakturaId)
      }
    },
    getPdfUrl(fakturaId) {
      if (this.componentType == 'faktura') {
        return `${API.url}/faktury/${fakturaId}/show`
      }
      if (this.componentType == 'specyfikacja') {
        return `${API.url}/faktury/${fakturaId}/specyfikacja/show`
      }
    },
    goBack() {
      this.$router.push({ path: `/faktury/` })
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
