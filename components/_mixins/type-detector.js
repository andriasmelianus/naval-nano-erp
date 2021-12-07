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
    getType(theValue) {
      if (theValue == null || theValue == undefined) {
        return undefined;
      } else {
        if (theValue instanceof Array) {
          return "array";
        } else if (typeof theValue == "object") {
          return "object";
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
      return this.getType(theValue) == undefined;
    },

    /**
     * Check whether a value is a string.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isString(theValue) {
      return this.getType(theValue) == "string";
    },

    /**
     * Check whether a value is a number.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isNumber(theValue) {
      return this.getType(theValue) == "number";
    },

    /**
     * Check whether a value is an array.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isArray(theValue) {
      return this.getType(theValue) == "array";
    },

    /**
     * Check whether a value is an object.
     * @param {Any} theValue
     * @returns {Boolean}
     */
    isObject(theValue) {
      return this.getType(theValue) == "object";
    }
  }
};
