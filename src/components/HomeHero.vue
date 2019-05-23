<template>
  <v-container fluid fill-height class="home-hero">
    <v-layout justify-center align-center column pa-5>
      <div class="display-4 font-weight-black white--text text-xs-center">GETS YOU</div>
      <div class="display-4 font-weight-black white--text text-xs-center mb-3">FROM "A" TO "B"</div>
      <div
        class="display-1 font-weight-bold white--text text-xs-center"
      >A unified transportation rental system</div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HomeHero"
};
</script>

<style scoped>
.home-hero {
  background: url("https://www.sdzsafaripark.org/sites/default/files/hero_images/cheetah_hero.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>