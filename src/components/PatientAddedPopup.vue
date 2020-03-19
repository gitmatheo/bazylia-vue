<template>
  <v-container row justify-center>
    <v-dialog v-model="open" persistent>
      <div class="wrapper">
        <h1>Dodano pacjenta!</h1>
        <v-icon class="icon" size="80px" color="success"
          >check_circle_outline</v-icon
        >
        <div class="desc">
          <p>
            <span>Imie:</span> <span>{{ patient.imie }}</span>
          </p>
          <p>
            <span>Nazwisko:</span> <span>{{ patient.nazwisko }}</span>
          </p>
          <p>
            <span>PESEL:</span> <span>{{ patient.pesel }}</span>
          </p>
          <p>
            <span>Numer karty:</span> <span>{{ patient.numerKarty }}</span>
          </p>
          <p>
            <span>Ulica:</span> <span>{{ patient.ulica }}</span>
          </p>
          <p>
            <span>Miasto:</span> <span>{{ patient.miasto }}</span>
          </p>
          <p>
            <span>Kod pocztowy:</span> <span>{{ patient.kodPocztowy }}</span>
          </p>
          <p>
            <span>Telefon:</span> <span>{{ patient.numerTelefonu }}</span>
          </p>
          <p>
            <span>NIP:</span> <span>{{ patient.NIP }}</span>
          </p>
        </div>

        <my-button color="white" fontColor="black" @click.native="close()"
          >Powrót</my-button
        >

        <RegistrationPopUp :patient="patient"
          >Rejestruj wizytę</RegistrationPopUp
        >
        <!-- </v-container> -->
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import RegistrationPopUp from '../components/RegistrationPopUp'
export default {
  components: {
    RegistrationPopUp
  },
  props: ['open', 'patient'],
  data: () => ({
    show1: false,
    dialog: false
  }),
  methods: {
    close() {
      this.$emit('onClose', false)
      this.dialog = false
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  width: 500px;
  height: fit-content;
  background: white;
  position: fixed;
  top: calc(50% - 250px);
  left: calc(50% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.desc {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  p {
    display: flex;
    justify-content: space-between;
    span {
      width: 50%;
    }
  }
}

.icon {
  padding: 20px;
}
</style>
