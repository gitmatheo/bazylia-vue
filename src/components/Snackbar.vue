<template>
  <v-snackbar class="snackbar" v-model="snackbar" top :timeout="5000">
    <p>{{ $store.state.error.snackBarMessage }}</p>

    <v-btn color="pink" text @click="snackbar = false">
      zamknij
    </v-btn>
  </v-snackbar>
</template>
<script lang="ts">
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    snackbar: false
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SNACKBAR') {
        this.snackbar = state.snackbar
      }
    })
  },
  methods: {
    ...mapMutations(['SNACKBAR']),
    closeSnackbart() {
      this.$store.commit('SNACKBAR', false)
    }
  }
}
</script>

<style lang="scss">
.snackbar {
  .v-snack__wrapper {
    padding: 10px;
  }
  p {
    margin: 0px;
  }
}
</style>
