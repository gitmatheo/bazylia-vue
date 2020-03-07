

<template>
    <v-btn :to="to" class="btn" :color="color" ><slot></slot></v-btn>
</template>


<script>

export default {

  props: {
    color: String,
    to: String,
  },
  data: () => ({
    // color: this.color,
    // to: this.to
  }),
  methods: {},
    created() {
        console.log("Elo from button my button")
        console.log(this)
  }
};
</script>

<style lang="scss" scoped>

.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #20CE99 !important;
    color: white !important;
    height: 48px;
    width: 224px;
    border-radius: 50px;

    i {
      color: white !important // dlaczego kurwa important ?;
    }

    &--black {
      background-color: black;
    }
    &--red {
      background-color: #F44336 !important // dlaczego kurwa important ?;
    }
}

</style>