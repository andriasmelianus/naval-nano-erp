/**
 * Enable minimal properties for file upload function.
 */
import { MessageExtractor } from "./message-extractor";
export const Uploader = {
  mixins: [MessageExtractor],

  props: {
    /**
     * URI to receive the uploaded file.
     */
    resourceUri: {
      type: String,
      required: true
    },

    /**
     * Field name.
     */
    fieldName: {
      type: String,
      default: "file"
    }
  },

  methods: {
    /**
     * Begin transmit the file.
     * @param {File} fileToUpload
     * @param {Array} additionalData Array of objects containing pair of field and data.
     * @return {Axios|Promise}
     */
    beginUploadFile: async function(fileToUpload, additionalData = []) {
      let vm = this,
        formData = new FormData();

      // Begin adding pair data to the formData.
      formData.append(vm.fieldName, fileToUpload);
      // Add additional data to the formData.
      additionalData.forEach(data => {
        let key = Object.keys(data)[0]; // Get the key/field name.
        formData.append(key, data[key]);
      });

      return await vm.$axios.$post(vm.resourceUri, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" }
      });
    }
  }
};
