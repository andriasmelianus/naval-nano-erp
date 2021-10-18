/**
 * Minimum required properties to implement Mapbox.
 */
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import mapboxgl from "mapbox-gl";
export const Mapbox = {
  mixins: [MessageExtractor],

  props: {
    // Initial latitude.
    latitude: {
      type: [Number, String],
      required: true
    },

    // Initial longitude.
    longitude: {
      type: [Number, String],
      required: true
    },

    // Initial zoom of the map.
    zoom: {
      type: [Number, String],
      default: 14
    }
  },

  data: vm => ({
    mapDivId: "mapbox",
    map: undefined
  }),

  computed: {
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
    }
  },

  mounted() {
    let vm = this;
    mapboxgl.accessToken = vm.$store.getters.mapboxToken;
    vm.map = new mapboxgl.Map({
      container: vm.mapDivId,
      style: "mapbox://styles/mapbox/streets-v11",
      center: vm.initialLnLt,
      zoom: vm.zoom
    });
  }
};
