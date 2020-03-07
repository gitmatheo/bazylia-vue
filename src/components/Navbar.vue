<template>
    <v-toolbar id="navbar" class="navbar">
      <v-tab :class="{ 'active': path == '/' }" @click="setPath('/')" to="/">Wyszukaj Pacjenta</v-tab>
      <v-tab :class="{ 'active': path == '/add-patient' }" @click="setPath('/add-patient')" to="/add-patient">Dodaj Pacjenta</v-tab>
      <v-tab :class="{ 'active': path == '/rozliczenia'}" @click="setPath('/rozliczenia')" to="/rozliczenia">Rozliczenia</v-tab>
    </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    isActive: true,
    path: "/"
  }),
  methods:{
    setPath(path) {
      this.path = path;
      console.log("TPAAAARADSADASDSADHISSS")
      console.log(this.path)

    },
  }
}
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
  box-shadow: none !important;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  &__content {
    max-width: 1360px;
    margin: 0 auto;

    .v-tabs__div {
      &.active {
        border-bottom: 2px solid #20CE99;
        color: #20CE99;
      }
    }
  }
}


</style>
