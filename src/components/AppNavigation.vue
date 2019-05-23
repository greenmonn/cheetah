<template>
  <v-toolbar app color="brown darken-4" dark>
    <v-toolbar-title></v-toolbar-title>
    <v-btn flat>
      <router-link class="nav-link" to="/Vehicles">BOOK VEHICLES</router-link>
    </v-btn>
    <v-spacer>Cheetah Tech</v-spacer>
    <v-btn flat>
      <router-link class="nav-link" to="/SignIn">SIGN IN</router-link>
    </v-btn>
    <v-btn color="brown lighten-3">
      <router-link class="nav-link" to="/Join">JOIN</router-link>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "AppNavigation"
};
</script>

<style scoped>
</style>