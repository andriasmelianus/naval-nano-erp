<template>
  <dir :id="mapDivId" :style="divStyle"></dir>
</template>

<script>
import { MapboxDefault } from "~/components/_mixins/mapbox/default";
import mapboxgl from "mapbox-gl"; // Need to import again to create Marker.
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
export default {
  mixins: [MapboxDefault, MessageExtractor],

  props: {
    width: {
      type: String,
      default: "100%",
    },

    height: {
      type: String,
      default: "100%",
    },
  },

  data: (vm) => ({
    marker: undefined,
  }),

  computed: {
    divStyle() {
      return "width: " + this.width + ";height: " + this.height;
    },
  },

  mounted() {
    let vm = this;
    mapboxgl.accessToken = vm.$store.getters.mapboxToken; // Need to set token for new mapboxgl instance.

    // Initialize geocoder.
    vm.map.addControl(
      new MapboxGeocoder({
        accessToken: vm.$store.getters.mapboxToken,
        mapboxgl: vm.map,
      })
    );

    // Initialize marker.
    vm.marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat(vm.initialLnLt)
      .on("dragend", vm.handleMarkerDragged)
      .addTo(vm.map);

    // Add click event to map.
    vm.map.on("click", vm.handleMapClicked);
  },

  methods: {
    /**
     * Catch the click event on the map.
     * Emits point-selected event when map is clicked.
     * @param {Object} e
     * @return {void}
     */
    handleMapClicked(e) {
      this.marker.setLngLat(e.lngLat);
      this.$emit("point-selected", [e.lngLat.lat, e.lngLat.lng]);
    },

    /**
     * Catch drag event on marker.
     * Emits point-selected event when marker is dragged.
     * @param {Object} e
     * @return {void}
     */
    handleMarkerDragged(e) {
      this.$emit("point-selected", [
        e.target._lngLat.lat,
        e.target._lngLat.lng,
      ]);
    },
  },
};
</script>

<style src="mapbox-gl/dist/mapbox-gl.css">
</style>
<style src="@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css">
</style>