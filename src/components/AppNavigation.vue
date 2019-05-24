<template>
  <v-toolbar app color="brown darken-4" dark>
    <v-toolbar-title></v-toolbar-title>
    <router-link class="nav-link" to="/Vehicles">
      <v-btn flat>BOOK VEHICLES</v-btn>
    </router-link>
    <v-spacer>
      <router-link to="/">Cheetah Tech</router-link>
    </v-spacer>
    <div v-if="!authenticated">
      <router-link class="nav-link" to="/SignIn">
        <v-btn flat>SIGN IN</v-btn>
      </router-link>
      <router-link class="nav-link" to="/Join">
        <v-btn color="brown lighten-3">JOIN</v-btn>
      </router-link>
    </div>
    <div v-else>
      <router-link to="/MyPage" class="user-message">
        Welcome
        <strong>{{ username }}</strong>!
      </router-link>
      <v-btn color="brown lighten-3">
        <router-link class="nav-link" to="/LogOut">LogOut</router-link>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppNavigation',
  data() {
    return {};
  },
  computed: mapState(['authenticated', 'username']),
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

.user-message {
  margin-right: 5px;
}
</style>
