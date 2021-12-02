export const IdExtractor = {
  methods: {
    /**
     * Extract the identity values from array of data/objects.
     * If the array element is not an object, it will be treated as an ID value.
     * @param {Array} arrayData Array of data to be extracted.
     * @param {String} idProperty Object property considered as identity.
     * @returns {Array}
     */
    extractIdsFromArray(arrayData, idProperty = "id") {
      if (arrayData == undefined) {
        return undefined;
      } else {
        let arrayIds = [];
        for (
          let arrayDataIndex = 0;
          arrayDataIndex < arrayData.length;
          arrayDataIndex++
        ) {
          const data = arrayData[arrayDataIndex];
          if (typeof data == "object") {
            arrayIds.push(data[idProperty]);
          } else {
            arrayIds.push(data);
          }
        }
        return arrayIds;
      }
    }
  }
};
