<template>
  <v-container row justify-center>
    <div class="wrapper">
      <h1>Niestety!</h1>
      <h2>Coś poszło nie tak.</h2>
      <v-icon size="200px" color="error">error_outline</v-icon>
      <my-button color="error" fontColor="white" to="/">Powrót !</my-button>
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

.icon {
  height: 200px;
  width: 200px;
  padding: 40px;
}
</style>
