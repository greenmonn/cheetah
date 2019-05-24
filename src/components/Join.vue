<template>
  <div id="join">
    <h1>{{ title }}</h1>

    <v-form ref="joinform">
      <v-container>
        <v-text-field
          type="text"
          name="username"
          v-model="input.username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          name="password"
          v-model="input.password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          label="Password"
          @click:append="showPassword = !showPassword"
          required
        ></v-text-field>
        <v-layout row wrap>
          <v-flex class="xs6">
            <v-text-field v-model="input.fname" :counter="10" label="First Name" required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field v-model="input.lname" :counter="10" label="Last Name" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-text-field v-model="input.phone_no" :mask="phoneMask" label="Phone Number" required></v-text-field>
        <v-text-field
          v-model="input.license_no"
          :mask="licenseMask"
          label="License Number"
          required
        ></v-text-field>
        <v-layout row wrap>
          <v-flex class="xs6">
            <v-text-field v-model="input.card_no" mask="credit-card" label="Card Number"></v-text-field>
          </v-flex>
          <v-flex class="xs6 sm3 md3">
            <v-text-field v-model="input.expr_date" :mask="dateMask" label="Expiration Date"></v-text-field>
          </v-flex>
          <v-flex class="xs6 sm3 md3">
            <v-text-field v-model="input.cvv" label="CVV" :counter="3"></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn color="brown darken-4 white--text" @click="join()">Join</v-btn>
      </v-container>
    </v-form>

    <v-dialog v-model="dialogue" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Join Success</v-card-title>

        <v-card-text>Welcome to Cheetah; your sign-up process was successful.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="finish()">Start Cheetah</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'join',
  data() {
    return {
      title: 'Join',
      dialogue: false,
      showPassword: false,
      phoneMask: '###-####-####',
      licenseMask: '##-##-######-##',
      dateMask: '##/##',
      input: {
        username: '',
        password: '',
        fname: '',
        lname: '',
        phone_no: '',
        license_no: '',
        card_no: '',
        expr_date: '',
        cvv: '',
      },
    };
  },
  methods: {
    join() {
      if (this.$refs.joinform.validate()) {
        this.$Axios
          .post('http://127.0.0.1:3001/user/join', this.input)
          .then(res => {
            if (res.data === true) {
              this.dialogue = true;
            }
          });
      }
    },
    finish() {
      this.$router.push('/SignIn');
    },
  },
};
</script>

<style scoped lang="scss">
#join {
  h1 {
    margin-left: 10px;
  }
  width: 700px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
