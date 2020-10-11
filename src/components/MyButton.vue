<template>
  <v-btn
    :to="to"
    :color="color"
    :style="{
      color: fontColor,
      width: width || 'fit-content',
      height: height || '48px'
    }"
    :disabled="disabled"
    :flat="flat"
    :outlined="outlined"
    round
    class="btn"
    ><slot></slot
  ></v-btn>
</template>

<script>
export default {
  props: {
    color: String,
    to: String,
    fontColor: String,
    disabled: Boolean,
    height: String,
    width: String,
    flat: Boolean,
    outlined: Boolean
  },
  data: () => ({
    // color: this.color,
    // to: this.to
  }),
  methods: {}
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #20ce99;
  color: white;
  min-width: 150px;
  padding: 0 20px;

  i {
    color: white !important;
  }

  &--black {
    background-color: black;
  }
  &--red {
    background-color: #f44336 !important;
  }
}
</style>
