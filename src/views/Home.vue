<template>
  <div class="home">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs6>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :rules="nameRules" label="PESEL" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Numer Karty" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Imię" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Nazwisko" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Ulica" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Miasto" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Kod-pocztowy" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Telefon" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="NIP" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Firma" required></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Stanowisko" required></v-text-field>

            <v-btn :disabled="!valid" color="success" @click="validate">
              <span>Szukaj</span>
              <v-icon right>search</v-icon>
            </v-btn>

            <v-btn color="info" @click="reset">Wszystkie</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>
