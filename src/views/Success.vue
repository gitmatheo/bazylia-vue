<template>
  <v-container row justify-center>
    <div class="wrapper">
      <h1>Gratulacje!</h1>
      <h2>Zarejestrowano wizytę.</h2>
      <img src="@/assets/success.svg" />
      <my-button color="#20CE99" fontColor="white" to="/">OK !</my-button>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show1: false
  }),
  methods: {}
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

img {
  height: 200px;
  padding: 40px;
}
</style>
