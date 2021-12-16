/**
 * This mixin helps the data type detection and avoid JavaScript bug with null value.
 * https://stackoverflow.com/questions/18808226/why-is-typeof-null-object
 */
export const TypeDetector = {
  methods: {
    /**
     * Detect the type of a passed value.
     * @param {Any} theValue
     * @returns {undefined|String}
     */
    detectDataType(theValue) {
      if (theValue == null || theValue == undefined) {
        return undefined;
      } else {
        if (theValue instanceof Array) {
          return "array";
        } else {
          return typeof theValue;
        }
      }
    },

    /**
     * Check whether a value is undefined.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isUndefined(theValue) {
      return this.detectDataType(theValue) == undefined;
    },

    /**
     * Check whether a value is a string.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isString(theValue) {
      return this.detectDataType(theValue) == "string";
    },

    /**
     * Check whether a value is a number.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isNumber(theValue) {
      return this.detectDataType(theValue) == "number";
    },

    /**
     * Check whether a value is an array.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isArray(theValue) {
      return this.detectDataType(theValue) == "array";
    },

    /**
     * Check whether a value is an object.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isObject(theValue) {
      return this.detectDataType(theValue) == "object";
    },

    /**
     * Check whether the provided string is a valid URL.
     * @param {String} stringUrl String to test.
     * @returns {Boolean}
     */
    isValidUrl(stringUrl) {
      let pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(stringUrl);
    }
  }
};
