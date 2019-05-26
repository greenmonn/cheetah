<script src="http://www.openlayers.org/api/OpenLayers.js"></script>

<template>
  <div id="vehicles">
    <h1 align="center" padding-top="30px">List of Vehicles</h1>
    <div v-for="vehicle in vehicles" v-bind:key="vehicle.id">
      <v-container fill-height>
        <v-layout justify-center align-content-center column pa-5>
          <v-flex lg12>
            <v-sheet color="grey" height="300px" elevation="20">
              {{vehicle.Position_long}},
              {{vehicle.Position_lat}}
              <br>
              <img v-if="vehicle.Is_reserved" src="../assets/booked.png" width="100px">
              <img v-else src="../assets/available.png" width="100px">
              <br>
              Charge per day: {{vehicle.Charge_per_day}}won/day
              <br>
              Model: {{vehicle.Model}}
              <br>
              Class: {{vehicle.Class}}
              <v-btn color="brown darken-4 white--text" @click="dialogue = true">Book This!</v-btn>
              <!--click = Book()
              + google maps 
              -->
            </v-sheet>
          </v-flex>
        </v-layout>
        <img v-bind:src="vehicle.Image" contain width="300px" background-color="grey">

        <v-dialog v-model="dialogue" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Booked!</v-card-title>

            <v-card-text>Payment success.</v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialogue = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
    <button v-on:click="fetchVehicle()">get data</button>
  </div>
</template>

<script>
export default {
  name: "vehicles",
  data: function() {
    return {
      dialogue: false,
      vehicles: []
    };
  },
  methods: {
    fetchVehicle() {
      this.$Axios
        .get(`${this.$host}/vehicle/search`)
        .then(response => {
          this.vehicles = response.data.vehicle_data;
          console.log(this.vehicles);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    Booked() {
      this.$Axios
        .post(`${this.$host}/vehicle/search`, "application/json") //Is_reserved가 0에서 1로 바뀌어야 함
        .then(res => {
          console.log(res);
          this.dialogue = true;
          //user mypage의 rental history에 들어가야 함
        });
    }
  }
};
</script>

<style>
</style>
