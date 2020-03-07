<template>
    <v-toolbar id="navbar" class="navbar">
      <v-tab to="/">Wyszukaj Pacjenta</v-tab>
      <v-tab to="/add-patient">Dodaj Pacjenta</v-tab>
      <v-tab to="/rozliczenia">Rozliczenia</v-tab>
    </v-toolbar>
</template>

<script>
export default {};
</script>

<style lang="scss">
/* a {
  text-decoration: none;
  color: black;
} */
template nav {
  background: white;
}

/* .navbar {
  box-shadow: none;
} */
.v-toolbar {
  background: #F4F4F4;
  box-shadow: none!important;
  &__content {
    max-width: 1360px;
    margin: 0 auto;
    color: #20ce99;
}
}

v-tab {
  border: 2px solid green;
}
</style>
