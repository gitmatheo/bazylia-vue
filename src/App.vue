<template>
  <v-app id="b-app" class="app">
    <Navbar></Navbar>
    <v-content>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>

    <Snackbar></Snackbar>
    <LoaderFloating></LoaderFloating>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Snackbar from '@/components/Snackbar'
import LoaderFloating from '@/components/LoaderFloating'

export default {
  name: 'App',
  components: {
    Navbar,
    Snackbar,
    LoaderFloating
  },
  data() {
    return {
      sideNav: false,
      role: '',
      menuItems: [
        { icon: 'home', title: 'Wyszukaj Pacjenta', link: '/' },
        { icon: 'done', title: 'Zrealizowane', link: '/completed' }
      ]
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

li {
  list-style: none;
}

.container {
  max-width: 1360px !important;
  margin-top: 100px;
}

/* .accent--text {
  color: #20CE99 !important;
  caret-color: #20CE99 !important;
} */

.pagination {
  display: flex;
  justify-content: center;
  background: white;
  padding: 20px 0 40px;
  .v-pagination__navigation,
  .v-pagination__item {
    box-shadow: none;
    outline: none;
  }
}

.v-expansion-panel__header {
  padding: 12px 0px !important;
}

#b-app .theme--light.v-stepper .v-stepper__step__step .v-icon {
  color: black;
}

#b-app .v-stepper__header {
  width: 80%;
  margin-top: 25px !important;
  margin: 0 auto;
  box-shadow: none;
}

#b-app .v-stepper__step.v-stepper__step--active {
  .v-stepper__step__step.primary {
    background: black !important;
    border: 1px solid black !important;
    color: white !important;
  }
}

#b-app .v-stepper__step {
  .v-stepper__step__step {
    background: white !important;
    border: 1px solid grey !important;
    color: grey !important;
  }
}

.v-dialog.v-dialog--active {
  border-radius: 10px;
}
.v-card__actions.actions {
  padding: 22px 10px;
}

.v-input {
  .accent--text {
    color: #20ce99 !important;
    caret-color: #20ce99 !important;
  }
}

// ==== custom RADIO BUTTONS START ====
.radio-wrapper {
  display: flex;
  justify-content: space-evenly;

  .v-input__control {
    display: block;
    width: 70%;

    .v-input__slot {
      display: block;
      .v-input--radio-group__input {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

// ==== custom RADIO BUTTONS END ====

.patient {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  &__card {
    display: flex;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    padding: 0px;
    justify-content: space-between;

    &--bold {
      font-weight: bold;
    }
  }

  &__desc {
    display: flex;
    justify-content: space-between;
  }

  &__desc-col {
    padding-top: 2rem;
    padding-left: 0px;

    li {
      display: flex;
      padding-top: 8px;
    }
  }

  &__btns {
    display: flex;
    padding: 10px 0px;
  }

  &__list-element {
    margin: 20px 0 30px;
  }

  &__service {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      align-items: flex-end;
      .patient__checkbox {
        height: 40px;
      }
    }
  }
  &__service-desc {
    /* width: 97%; */
    display: flex;
    justify-content: space-between;
  }

  &__details-element {
    text-align: right;
    padding-right: 3px;
  }
}

// ==== custom v-text-field START ====

.v-text-field {
  .v-label {
    &--active {
      transform: translateY(-21px) translateX(10px) scale(0.75) !important;
      background: white !important;
      width: fit-content !important;
      padding: 0 10px !important;
    }
  }
}

.v-text-field__slot {
  label {
    margin-left: 20px !important;
    top: 14px !important;
  }
}

.v-input {
  &__slot {
    &:after {
      border: none !important;
    }
    &:before {
      border: none !important;
    }
  }
  input {
    max-height: 48px !important;
    padding-left: 30px !important;
  }
}

.v-messages__message {
  margin-left: 20px;
}

.component-wrapper {
  padding: 60px 120px;
}

// ==== custom v-text-field END ====

// TRANSITIONS

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(50px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.slide-up-enter {
  transform: translateX(20px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}
</style>
