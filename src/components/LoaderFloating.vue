<template>
  <v-dialog v-model="$store.state.loader" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        <slot></slot>
        Ładuje...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  data: () => ({
    loader: false
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'LOADER') {
        this.loader = state.loader
      }
    })
  }
}
</script>
