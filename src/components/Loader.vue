<template>
  <div class="loader">
    <pulse-loader class="loader__element"></pulse-loader>
  </div>
</template>
<script lang="ts">
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  components: {
    PulseLoader
  }
}
</script>

<style lang="scss" scoped>
.loader {
  &__element {
    margin: 40px auto;
    width: fit-content;
  }
}
</style>
