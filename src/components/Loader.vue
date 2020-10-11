<template>
  <div class="loader">
    <pulse-loader class="loader__element"></pulse-loader>
  </div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'
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
