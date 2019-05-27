<script src="http://www.openlayers.org/api/OpenLayers.js"></script>

<template>
  <div id="vehicles">
    <h1 align="center" padding-top="30px">List of Vehicles</h1>
    <div v-for="vehicle in vehicles" v-bind:key="vehicle.id">
      <v-container fill-height>
        <v-layout justify-center align-content-center column pa-5>
          <v-flex lg12>
            <v-sheet elevation="20">
              <img
                v-if="vehicle.Occupied_by"
                src="../assets/booked.png"
                width="100px"
                position="right"
              >
              <img v-else src="../assets/available.png" width="100px">

              <br>
              <div style="text-align:center; font-size: 3.0em;">
                <strong>{{vehicle.Model}}</strong>
                <br>
                Class: {{vehicle.Class}}
                <br>
                Charge: {{vehicle.Charge_per_day}}won/day
              </div>
              <div style="text-align:center">
                <iframe
                  v-if="!vehicle.Occupied_by"
                  width="400"
                  height="200"
                  frameborder="0"
                  style="border:3px groove black"
                  src="https://www.google.com/maps/embed/v1/view?key=ASKSEUNGJUN&center=36.367611, 127.361206&zoom=18&maptype=satellite"
                  allowfullscreen
                ></iframe>
                <br>
                <v-btn
                  v-if="!vehicle.Occupied_by"
                  color="brown darken-4 white--text"
                  @click="dialogue = true"
                >Book This!</v-btn>
              </div>
            </v-sheet>
          </v-flex>
        </v-layout>
        <img v-bind:src="vehicle.Image" contain width="300px" background-color="grey">

        <v-dialog v-model="dialogue" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Booked!</v-card-title>
            <v-card-text>Payment success.</v-card-text>
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
  data() {
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
          //console.log(typeof this.vehicles[0].Position_long.toString());
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
