<template>
  <div class="mypage">
    <v-container>
      <h1>{{ title }}</h1>

      <v-layout row wrap class="profile">
        <v-flex xs6 sm9 md9>
          <v-form ref="joinform">
            <v-container class="profile-form">
              <h2>
                <v-icon>person</v-icon>
                {{ input.username }}
              </h2>
              <br>
              <v-layout row wrap>
                <v-flex class="xs6">
                  <v-text-field v-model="input.fname" label="First Name" required></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="input.lname" label="Last Name" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-text-field
                v-model="input.phone_no"
                :mask="phoneMask"
                label="Phone Number"
                required
              ></v-text-field>
              <v-text-field
                v-model="input.license_no"
                :mask="licenseMask"
                label="License Number"
                required
              ></v-text-field>
            </v-container>
            <v-btn color="brown darken-4 white--text" @click="updateProfile()">Update Profile</v-btn>
            <v-btn color="primary">Add Payment Method</v-btn>
          </v-form>
        </v-flex>

        <v-flex xs6 sm3 md3 align-center justify-center layout text-xs-center>
          <v-avatar size="200" color="grey lighten-4">
            <img src="https://greenmon.dev/assets/images/Greenmon-1.png" alt="avatar">
          </v-avatar>
        </v-flex>
      </v-layout>

      <v-dialog v-model="dialogue" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Profile Update</v-card-title>

          <v-card-text>Profile update success.</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialogue = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <br>
      <h1>Rental History</h1>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'mypage',
  data() {
    return {
      title: 'My Page',
      dialogue: false,
      phoneMask: '###-####-####',
      licenseMask: '##-##-######-##',
      input: { ...this.$store.state.userInfo },
    };
  },
  methods: {
    updateProfile() {
      const { token } = this.$store.state;

      this.$Axios
        .post(`${this.$host}/user/updateInfo`, { token, ...this.input })
        .then((res) => {
          console.log(res);

          if (res.data.success) {
            const { user } = res.data;

            this.$store.commit('updateUser', user);
            this.dialogue = true;
          } else {
            this.input = { ...this.$store.state.userInfo };
          }
        });
    },
  },
};
</script>
<style scoped lang="scss">
.profile {
  border: 1px solid #cccccc;
  background-color: #ffffff;
  padding: 50px;
  margin: 30px 0;
  border-radius: 30px;

  .profile-form {
    padding-right: 100px;
  }

  button {
    margin-left: 15px;
  }
}
</style>