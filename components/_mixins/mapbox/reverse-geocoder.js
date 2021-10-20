import { MessageExtractor } from "~/components/_mixins/message-extractor";
/**
 * Enable the Mapbox reverse-geocoding functionality.
 */
export const MapboxReverseGeocoder = {
  mixins: [MessageExtractor],

  data: vm => ({
    reverseGeocodingUrl: "https://api.mapbox.com/geocoding/v5",

    placeTypePoi: "poi",
    placeTypeAddress: "neighborhood",
    placeTypePostalCode: "postcode",
    placeTypeDistrict: "locality",
    placeTypeCity: "place",
    placeTypeRegion: "region",
    placeTypeCountry: "country"
  }),

  methods: {
    /**
     * Assemble reverse-geocoding ready-to-use URL.
     * @param {Float} latitude
     * @param {Float} longitude
     * @param {String} endpoint https://docs.mapbox.com/api/search/geocoding/#endpoints
     * @returns {String}
     */
    assembleReverseGeocodingUrl(
      latitude,
      longitude,
      endpoint = "mapbox.places"
    ) {
      return (
        this.reverseGeocodingUrl +
        "/" +
        endpoint +
        "/" +
        longitude +
        "," +
        latitude +
        ".json?access_token=" +
        this.$store.getters.mapboxToken
      );
    },

    /**
     * Perform reverse-geocoding process from latitude and longitude.
     * Result from this operation will returns complete part of address in JSON format defined by Mapbox.
     * Use extractReverseGeocodeResultToSimpleAddress() function to simplify returned address.
     * @param {Float} latitude
     * @param {Float} longitude
     * @param {String} endpoint https://docs.mapbox.com/api/search/geocoding/#endpoints
     * @returns {Promise}
     */
    reverseGeocode(latitude, longitude, endpoint = "mapbox.places") {
      let lt = parseFloat(latitude),
        ln = parseFloat(longitude);

      return fetch(this.assembleReverseGeocodingUrl(lt, ln, endpoint)).then(
        function(result) {
          return result.json();
        }
      );
    },

    /**
     * Extract reverse-geocode result to simple address.
     * Sample address object format:
     * {
     *      "poi": "...", // Optional. Because there are places without point of interest.
     *      "address": "...",
     *      "postal_code": "...",
     *      "district": "...",
     *      "city": "...",
     *      "region": "...",
     *      "country": "..."
     * }
     * @param {Object} reverseGeocodeResult Result returned from Mapbox reverse geocode process.
     * @return {Object}
     */
    extractReverseGeocodeResultToSimpleAddress(reverseGeocodeResult) {
      let resultFeatures = reverseGeocodeResult.features,
        resultFeaturesLength = resultFeatures.length,
        poi = undefined,
        address = undefined,
        postalCode = undefined,
        district = undefined,
        city = undefined,
        region = undefined,
        country = undefined;

      for (let i = 0; i < resultFeaturesLength; i++) {
        switch (resultFeatures[i].place_type[0]) {
          case this.placeTypePoi:
            poi = resultFeatures[i].text;
            break;
          case this.placeTypeAddress:
            // address = resultFeatures[i].text; // Since the text property only contains the street name.
            address = resultFeatures[i].place_name;
            break;
          case this.placeTypePostalCode:
            postalCode = resultFeatures[i].text;
            break;
          case this.placeTypeDistrict:
            district = resultFeatures[i].text;
            break;
          case this.placeTypeCity:
            city = resultFeatures[i].text;
            break;
          case this.placeTypeRegion:
            region = resultFeatures[i].text;
            break;
          case this.placeTypeCountry:
            country = resultFeatures[i].text;
            break;
        }
      }

      return {
        poi: poi,
        address: address,
        postal_code: postalCode,
        district: district,
        city: city,
        region: region,
        country: country
      };
    }
  }
};
