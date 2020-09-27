import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    invoices: [],
    loader: false,
    snackbar: false,
    error: {
      timestamp: 'a',
      status: 'b',
      error: 'c',
      message: 'd',
      path: 'e',
      snackBarMessage: ''
    },
    user: {
      isAuthenticated: false,
      role: null,
      username: null
    },
    patients: [],
    wizyta: {
      pacjent: {
        pacjentId: '',
        imie: '',
        nazwisko: '',
        pesel: '',
        numerKarty: '',
        ulica: '',
        miasto: '',
        kodPocztowy: '',
        numerTelefonu: '',
        nip: '',
        stanowisko: '',
        dataOrzeczenia: null,
        firma: null
      },
      typWizyty: '',
      rodzajBadan: null,
      dataWizyty: '',
      usluga: {
        uslugaId: '',
        nazwa: '',
        cenaZwykla: null,
        cenaUmowa: null,
        cenaRabat: null
      },
      faktura: ''
    },
    rozliczenia: {},
    faktura: null,
    companies: [],
    wizyty: []
  },
  getters: {
    getPatients: state => {
      return state.patients
    },
    getPatientForReg: state => {
      return state.patientForReg
    },
    getCompanies: state => {
      return state.companies
    },
    getWizyta: state => {
      return state.wizyta
    },
    getAllRozliczenia: state => {
      return state.rozliczenia
    },
    getAllWizyty: state => {
      return state.wizyty
    },
    getFaktura: state => {
      return state.faktura
    },
    getAllInvoices: state => {
      return state.invoices
    },
    getIsAuthenticated: state => {
      return state.isAuthenticated
    }
  },

  mutations: {
    AUTHENTICATE_USER: (state, user) => {
      state.user = user
    },
    // RESET_WIZYTA: state => {
    //   state.wizyta = {
    //     pacjent: {
    //       pacjentId: '',
    //       imie: '',
    //       nazwisko: '',
    //       pesel: '',
    //       numerKarty: '',
    //       ulica: '',
    //       miasto: '',
    //       kodPocztowy: '',
    //       numerTelefonu: '',
    //       nip: '',
    //       stanowisko: '',
    //       dataOrzeczenia: null
    //     },
    //     typWizyty: '',
    //     rodzajBadan: null,
    //     dataWizyty: '',
    //     usluga: {
    //       uslugaId: '',
    //       nazwa: '',
    //       cenaZwykla: null,
    //       cenaUmowa: null,
    //       cenaRabat: null
    //     },
    //     faktura: ''
    //   }
    // },
    DELETE_PATIENT(state, pacjentId) {
      state.patients = state.patients.filter(
        pacjent => pacjent.pacjentId != pacjentId
      )
    },
    UPDATE_PATIENT_FOR_REGISTRATION: (state, pacjent) => {
      state.wizyta.pacjent = pacjent
    },
    UPDATE_TYP_WIZYTY: (state, typWizyty) => {
      state.wizyta.typWizyty = typWizyty
    },
    UPDATE_RODZAJ_BADAN: (state, rodzajBadan) => {
      state.wizyta.rodzajBadan = rodzajBadan
    },
    UPDATE_DATE_AND_TIME: (state, dataWizyty) => {
      state.wizyta.dataWizyty = dataWizyty
    },
    UPDATE_PATIENT_COMPANY: (state, firma) => {
      state.wizyta.pacjent.firma = firma
    },
    UPDATE_USLUGA: (state, usluga) => {
      state.wizyta.usluga = usluga
    },
    GET_ALL_PATIENTS_FROM_DB: (state, patients) => {
      state.patients = patients
    },
    GET_ALL_COMPANIES_FROM_DB: (state, companies) => {
      state.companies = companies
    },
    GET_ALL_ROZLICZENIA_FROM_DB: (state, rozliczenia) => {
      state.rozliczenia = rozliczenia
    },
    GET_ALL_INVOICES_FROM_DB: (state, invoices) => {
      state.invoices = invoices
    },
    GET_ALL_WIZYTY_FROM_DB: (state, wizyty) => {
      state.wizyty = wizyty
    },
    GET_FAKTURA: (state, faktura) => {
      state.faktura = faktura
    },
    ADD_COMPANY: (state, company) => {
      state.companies.push(company)
    },
    SNACKBAR(state, payload) {
      state.snackbar = payload
    },
    LOADER(state, payload) {
      state.loader = payload
    },
    SAVE_ERROR_DATA(state, error) {
      if (!error.status) {
        state.error.snackBarMessage = 'Network Error'
      }
      if (error.response.status == 401) {
        state.error.snackBarMessage =
          'Nieprawidłowe dane - sprawdź swój login i hasło'
      }
      if (error.response) {
        switch (error.response.data.status) {
          case 400:
            state.error.snackBarMessage =
              'Nie udało się wykonać tej czynności, sprawdź czy wszystkie dane zostały podane prawidłowo'
            break
          case 403:
            state.error.snackBarMessage = 'Brak dostępu'
            break
          case 409:
            state.error.snackBarMessage = 'Akcja niedozwolona'
            break
          case 410:
            state.error.snackBarMessage =
              'Nie znaleziono żądanego zasobu, odśwież stronę i spróbuj ponownie'
            break
          case 500:
            state.error.snackBarMessage =
              'Wystąpił nieoczekiwany błąd, spróbuj ponownie za chwilę'
            break
          default:
        }
      }
    }
  },
  actions: {}
})
