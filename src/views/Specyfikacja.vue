<template>
  <v-app>
    <FakturaComponent 
    componentType="specyfikacja"
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