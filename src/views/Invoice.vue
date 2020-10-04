<template>
  <v-app>
    <FakturaComponent 
    componentType="faktura"
    >
    </FakturaComponent>
  </v-app>
</template>

<script>
import FakturaComponent from '../components/FakturaComponent'

export default {
  components: {
    FakturaComponent
  }
}
</script>