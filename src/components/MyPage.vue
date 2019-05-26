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
            <v-btn color="primary" @click="payment_dialogue=true">Add Payment Method</v-btn>
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

      <v-dialog v-model="payment_dialogue" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Payment Method</v-card-title>

          <v-card-text>Update your payment method.</v-card-text>
          <v-form ref="paymentform">
            <v-container>
              <v-layout row wrap>
                <v-flex class="xs6">
                  <v-text-field v-model="payment.card_no" mask="credit-card" label="Card Number"></v-text-field>
                </v-flex>
                <v-flex class="xs6 sm3 md3">
                  <v-text-field v-model="payment.expr_date" :mask="dateMask" label="Expiration Date"></v-text-field>
                </v-flex>
                <v-flex class="xs6 sm3 md3">
                  <v-text-field v-model="payment.cvv" label="CVV" :counter="3"></v-text-field>
                </v-flex>
              </v-layout>
              <v-btn color="brown darken-4 white--text" @click="updatePayment()">Update</v-btn>
            </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="payment_dialogue = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <br>
      <h1>Rental History</h1>
      <br>
      <v-data-table :headers="headers" :items="histories" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.rid }}</td>
          <td>{{ props.item.reserve_date }}</td>
          <td>{{ props.item.return_date }}</td>
          <td>{{ props.item.charge }}</td>
          <td>{{ props.item.model }}</td>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'mypage',
  mounted() {
    console.log('mounted');
    this.getReservationHistory();
  },
  data() {
    return {
      title: 'My Page',
      dialogue: false,
      payment_dialogue: false,
      phoneMask: '###-####-####',
      licenseMask: '##-##-######-##',
      dateMask: '##/##',
      input: { ...this.$store.state.userInfo },
      payment: {
        username: this.$store.state.username,
        card_no: '',
        expr_date: '',
        cvv: '',
      },
      headers: [
        {
          text: 'Id',
          align: 'left',
          value: 'rid',
        },
        { text: 'Reserved Date', value: 'reserve_date' },
        { text: 'Returned Date', value: 'return_date' },
        { text: 'Charge', value: 'charge' },
        { text: 'Reserved Vehicle', value: 'model' },
      ],
      histories: [],
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
    updatePayment() {
      const { token } = this.$store.state;

      this.$Axios
        .post(`${this.$host}/user/updateInfo`, { token, ...this.payment })
        .then((res) => {
          console.log(res);

          if (res.data.success) {
            console.log(res);

            this.payment_dialogue = false;
          }
        });
    },
    getReservationHistory() {
      const { token, uid } = this.$store.state;
      console.log(uid);

      this.$Axios
        .get(`${this.$host}/reservation/${uid}`, { token })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            const { histories } = res.data;

            this.histories = histories;
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