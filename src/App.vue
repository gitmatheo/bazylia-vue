<template>
  <v-app class="white">
    <Navbar></Navbar>
    <!-- <v-navigation-drawer v-model="sideNav">
      <v-list>
        <v-list-title v-for="item in menuItems" :key="item.title">
          <v-list-title-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-title-action>
          <v-list-title-content>
            <router-link to="item.link">{{item.title}}</router-link>
          </v-list-title-content>
        </v-list-title>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon>
        @click.native.stop="sideNav != sideNav"
        class="hidden-sm-and-up"
      </v-toolbar-side-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>-->

    <router-link to="/completed">Zrealizowane</router-link>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      sideNav: false,

      menuItems: [
        { icon: "home", title: "Wyszukaj Pacjenta", link: "/" },
        { icon: "done", title: "Zrealizowane", link: "/completed" }
      ]
    };
  }
};
</script>
