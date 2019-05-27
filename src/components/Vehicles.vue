<script src="http://www.openlayers.org/api/OpenLayers.js"></script>

<template>
  <div id="vehicles">
    <br>
    <h1 align="center" padding-top="30px">Our Vehicles</h1>
    <div v-for="vehicle in vehicles" v-bind:key="vehicle.Vid">
      <v-container fill-height>
        <v-layout justify-center align-content-center column pa-5>
          <v-flex lg12>
            <v-sheet class="box" elevation="20">
              <v-flex style="float:right; margin-right:10px; margin-top:10px">
                <img v-if="vehicle.Is_reserved" src="../assets/booked.png" width="100px">
                <div class="right-box" v-else>
                  <img src="../assets/available.png" width="100px">
                  <br>
                  <v-btn
                    large
                    color="red white--text"
                    class="book-button"
                    @click="Booked(vehicle.Vid, vehicle.Charge_per_day)"
                  >Book This!</v-btn>
                </div>
              </v-flex>

              <br>
              <v-layout row wrap>
                <v-flex sm-8>
                  <div class="vehicle-item">
                    <strong>{{ vehicle.Model }}</strong>
                    <br>
                    <p>
                      <v-chip color="primary" text-color="white">
                        {{ vehicle.Class }}
                        <v-icon right>star</v-icon>
                      </v-chip>
                      <v-chip
                        :color="getVehicleColor(vehicle.Vtype_id)"
                        text-color="white"
                      >{{ getVehicleType(vehicle.Vtype_id) }}</v-chip>
                      <br>
                      <strong>￦{{ vehicle.Charge_per_day }}</strong> per
                      <strong>1 day</strong>
                    </p>
                  </div>
                  <div style="text-align:center">
                    <iframe
                      class="map"
                      v-if="!vehicle.Is_reserved"
                      width="400"
                      height="200"
                      frameborder="0"
                      style="border:3px groove black"
                      src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBf4DvQpLUIxEhRIQjB9RSwBCIQueM9oi4&center=36.367611, 127.361206&zoom=18&maptype=satellite"
                      allowfullscreen
                    ></iframe>
                    <br>
                  </div>
                </v-flex>
                <v-flex sm-4>
                  <img v-bind:src="vehicle.Image" contain width="400px" background-color="grey">
                </v-flex>
              </v-layout>
            </v-sheet>
          </v-flex>
        </v-layout>

        <v-dialog v-model="dialogue" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Booked!</v-card-title>
            <v-card-text>Payment success.</v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vehicles',
  data() {
    return {
      dialogue: false,
      vehicles: [],
    };
  },
  mounted() {
    this.fetchVehicle();
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
    getVehicleType(type_id) {
      if (type_id == 1) {
        return 'Car';
      } else if (type_id == 2) {
        return 'Kickboard';
      } else if (type_id == 3) {
        return 'Bike';
      }
    },
    getVehicleColor(type_id) {
      if (type_id == 1) {
        return 'green';
      } else if (type_id == 2) {
        return 'red';
      } else if (type_id == 3) {
        return 'orange';
      }
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    Booked(Vid, Charge) {
      if (this.$store.state.authenticated == true) {
        const reservation = [Charge * this.getRandomInt(1, 30), this.$store.state.uid, Vid];

        this.$Axios
          .post(`${this.$host}/vehicle/book`, { Vid, reservation }) //Is_reserved가 0에서 1로 바뀌어야 함
          .then(res => {
            if (res.data === true) {
              this.dialogue = true;
              this.fetchVehicle();
            }
            //user mypage의 rental history에 들어가야 함
          });
      } else {
        this.$router.push('/SignIn');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.right-box {
  text-align: right;
}

.vehicle-item {
  font-size: 2em;
  margin-left: 40px;
  p {
    font-size: 18px;
    margin-bottom: 30px;
  }
}
.book-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
}

.map {
  margin-bottom: 20px;
}
</style>
