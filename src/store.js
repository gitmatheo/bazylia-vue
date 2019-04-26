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
        invoice: "308/2018"
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
        invoice: "308/2018"
      }
    ]
  },
  getters: {
    getPatients: state => {
      console.log("dziala klikniete");
      return state.patients;
    }
  },
  mutations: {
    CHANGE_LANG: (state, lang) => {
      state.language = lang;
    }
  },
  actions: {}
});
