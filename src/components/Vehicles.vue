<template>
  <div id="vehicles">
    <h1>List of Vehicles</h1>
    <div v-for="vehicle in vehicles" v-bind:key="vehicle.id">
      <v-container fluid fill-height>
        <v-layout justify-center align-center column pa-5>
          <div class="display-4 font-weight-black white--text text-xs-center">GETS YOU</div>
          <div class="display-4 font-weight-black white--text text-xs-center mb-3">FROM "A" TO "B"</div>
          <div
            class="display-1 font-weight-bold white--text text-xs-center"
          >A unified transportation rental system</div>
        </v-layout>

        <img v-bind:src="vehicle.Image">
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
    }
  }
};
</script>
