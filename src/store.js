import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    patients: [
      {
        id: 1,
        company: "Mc Donalds's",
        name: "Zdzislaw",
        secondName: "Brzeczyszczykiewicz",
        pesel: "1223124",
        serviceName: "badanie1",
        invoice: "308/2018",
        lastService: {
          company: {
            id: 2,
            name: "Firma 2",
            street: "Zielona 12",
            city: "Zgierz",
            postCode: "95-100",
            REGON: "41413234",
            NIP: "41242141241",
            ryczalt: "tak"
          }
        }
      },
      {
        id: 2,
        company: "ABC",
        name: "Waldek",
        secondName: "Kowalski",
        pesel: "3123124",
        serviceName: "badanie1123",
        invoice: "308/2018"
      },
      {
        id: 3,
        company: "ZYS",
        name: "Adam",
        secondName: "Nowak",
        pesel: "7673124",
        serviceName: "badanie144",
        invoice: null
      },
      {
        id: 4,
        company: "Jaks firma",
        name: "Cypsztyk",
        secondName: "Pacynski",
        pesel: "9823124",
        serviceName: "badanie12",
        invoice: "308/2018",
        lastService: {
          company: {
            id: 3,
            name: "Firma 3",
            street: "Czerwona 1441",
            city: "Radom",
            postCode: "91-200",
            REGON: "11111111114",
            NIP: "22222222",
            ryczalt: "nie"
          }
        }
      }
    ],
    patientForReg: {
      id: null,
      company: "",
      name: "",
      secondName: "",
      pesel: "",
      serviceName: "",
      invoice: ""
    },
    companies: [
      {
        id: 1,
        name: "Firma 1",
        street: "Błotna 12",
        city: "Zgierz",
        postCode: "95-100",
        REGON: "42341243234",
        NIP: "41242141241",
        ryczalt: "tak"
      },
      {
        id: 2,
        name: "Firma 2",
        street: "Zielona 12",
        city: "Zgierz",
        postCode: "95-100",
        REGON: "41413234",
        NIP: "41242141241",
        ryczalt: "tak"
      },
      {
        id: 3,
        name: "Firma 3",
        street: "Czerwona 1441",
        city: "Radom",
        postCode: "91-200",
        REGON: "11111111114",
        NIP: "22222222",
        ryczalt: "nie"
      }
    ]
  },
  getters: {
    getPatients: state => {
      return state.patients;
    },

    getPatientForReg: state => {
      return state.patientForReg;
    },
    getCompanies: state => {
      return state.companies;
    }
  },
  mutations: {
    SET_PATIENT_FOR_REGISTRATION: (state, patient) => {
      state.patientForReg = patient;
    }
  },
  actions: {}
});
