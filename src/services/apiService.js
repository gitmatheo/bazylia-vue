import axios from 'axios'
import API from '@/constants/api'
import router from '../router'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
  getCompanies() {
    return axios.get(`${API.url}/firmy`)
  },
  getCompany(id) {
    return axios.get(`${API.url}/firmy/${id}`)
  },
  addCompany(company) {
    return axios.post(`${API.url}/firmy`, company)
  },
  // getPatients() {
  //   return axios.get(`${API.url}/pacjenci`, {
  //     params: {
  //       pageNumber: 1,
  //       pageSize: 50,
  //       order: 'ASC'
  //     }
  //   })
  // },

  getPatients() {
    return axios.get(`${API.url}/pacjenci`)
  },
  submitPatient(patient) {
    return axios.post(`${API.url}/pacjenci`, patient)
  },
  deletePatient(patientID) {
    return axios.delete(`${API.url}/pacjenci/${patientID}`)
  },
  getWizyty() {
    return axios.get(`${API.url}/wizyty`)
  },

  getWizytyByDate(startDate, endDate) {
    return axios.get(`${API.url}/wizyty`, {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
  },

  deleteWizyta(id) {
    return axios.delete(`${API.url}/wizyty/${id}`)
  },
  registerVisit(wizyta) {
    return axios
      .post(`${API.url}/wizyty`, wizyta)
      .then(() => router.push({ path: '/success' }))
      .catch(() => router.push({ path: '/error' }))
  },
  getRozliczenia(type) {
    return axios.get(`${API.url}/rozliczenia/${type}`)
  },
  getCounter() {
    return axios.get(`${API.url}/wizyty/incomplete/counter`)
  },
  getIncompleteVisits() {
    return axios.get(`${API.url}/wizyty/incomplete`)
  },

  submitDecyzja(pacjentID, decyzja) {
    return axios.post(`${API.url}/pacjenci/${pacjentID}/decyzja`, {
      decyzja: decyzja
    })
  },
  submitDataOrzeczenia(pacjentID, dataOrzeczenia) {
    return axios.post(`${API.url}/pacjenci/${pacjentID}/data-orzeczenia`, {
      dataOrzeczenia: dataOrzeczenia
    })
  },

  submitForInvoice(doZafakturowania) {
    return axios.post(`${API.url}/faktury`, doZafakturowania)
  },
  getInvoice(invoiceID) {
    return axios.get(`${API.url}/faktury/${invoiceID}`)
  },
  getSpecification(invoiceID) {
    return axios.get(`${API.url}/faktury/${invoiceID}/specyfikacja`)
  },
  getUslugi(type) {
    return axios.get(`${API.url}/uslugi/${type}`)
  },
  login(login, pass) {
    var encodedBase64String = btoa(`${login}:${pass}`)
    const options = {
      headers: {
        Authorization: `Basic ${encodedBase64String}`
      },
      withCredentials: true
    }
    return axios.get(`${API.url}/login`, options)
  },
  logout() {
    return axios.get(`${API.url}/logout`)
  },
  sendMail(invoiceId) {
    return axios.post(`${API.url}/faktury/${invoiceId}/send-email`)
  },
  getPdf(invoiceId) {
    return axios
      .get(`${API.url}/faktury/${invoiceId}/export`, {
        responseType: 'blob'
      })
      .then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]))
        var fileLink = document.createElement('a')
        var filename = response.headers['content-disposition']
          .split('filename=')[1]
          .split('"')
          .join('')
        fileLink.href = fileURL
        fileLink.setAttribute('download', filename)
        document.body.appendChild(fileLink)
        fileLink.click()
      })
  }
}
