<template>
  <dir id="map" :style="divStyle"></dir>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
export default {
  mixins: [MessageExtractor],

  props: {
    width: {
      type: String,
      default: "100%",
    },

    height: {
      type: String,
      default: "100%",
    },

    // Initial latitude.
    latitude: {
      type: [Number, String],
      required: true,
    },

    // Initial longitude.
    longitude: {
      type: [Number, String],
      required: true,
    },

    // Initial zoom of the map.
    zoom: {
      type: [Number, String],
      default: 8,
    },

    resourceUriToGetToken: {
      type: String,
      default: "/support/mapbox-token",
    },
  },

  data: (vm) => ({
    map: undefined,
  }),

  computed: {
    divStyle() {
      return "width: " + this.width + ";height: " + this.height;
    },

    /**
     * Initial latitude and longitude as array.
     */
    initialLtLn() {
      return [this.latitude, this.longitude];
    },

    /**
     * Initial longitude and latitude as array.
     */
    initialLnLt() {
      return [this.longitude, this.latitude];
    },
  },

  mounted() {
    let vm = this;
    vm.$axios
      .$get(vm.resourceUriToGetToken)
      .then(function (result) {
        mapboxgl.accessToken = result;
        vm.map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: vm.initialLnLt,
          zoom: vm.zoom,
        });
      })
      .catch(function (result) {
        vm.$store.commit("global-snackbar/show", {
          color: "error",
          message: vm.messageErrorExtract(result),
        });
      });
  },
};
</script>

<style src="mapbox-gl/dist/mapbox-gl.css">
</style>