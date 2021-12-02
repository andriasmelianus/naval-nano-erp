/**
 * Provide the minimal properties for upload control.
 * v-model accepts file IDs from database.
 *
 * Props
 * 1. place-holder {String}
 * 2. accept {String}
 * 3. parent-resource-uri {String}
 * 4. return-id {Boolean}
 * 5. id-index {String}
 * 6. upload-success-message {String}
 * 7. upload-partially-success-message {String}
 * 8. upload-failed-message {String}
 * 9. no-file-to-upload-message {String}
 *
 * Data
 * 1. filesToBeUploaded {Array}
 * 2. additionalData {Array}
 * 3. existingFileIds {Array}
 * 4. successfulUploadResults {Array}
 * 5. errorMessage {String}
 *
 * Methods
 * 1. beginUploadFiles {void}
 */
import { MessageExtractor } from "./message-extractor";
import { Uploader } from "./uploader";
export const GlobalUploadHandler = {
  mixins: [MessageExtractor, Uploader],

  props: {
    /**
     * Enable v-model directive support.
     */
    value: {
      type: [String, Number, Array]
    },

    /**
     * Text to be displayed as label.
     */
    placeHolder: {
      type: String,
      default: "Pilih File"
    },

    /**
     * File type filter for open file dialog.
     */
    accept: String,

    /**
     * API URI of the parent component.
     * This URI needed to form the deletion process.
     * If this component is used by product component,
     * then the deletion URI cannot be /image/{image_id},
     * but it should be /product/image/{image_id},
     * whether the /product is the parent.
     */
    parentResourceUri: {
      type: String,
      required: true
    },

    /**
     * API server will respond with an object containing file data.
     * Setting this props to true, will emit identity only to the parent component.
     */
    returnId: {
      type: Boolean,
      default: false
    },

    /**
     * Property name of the uploaded file considered as identity.
     */
    idIndex: {
      type: String,
      default: "id"
    },

    /**
     * Since the uploader supports multiple files to be uploaded,
     * we need to define a single success, partially success and fail message.
     */
    uploadSuccessMessage: {
      type: String,
      default: "File berhasil diupload"
    },
    uploadPartiallySuccessMessage: {
      type: String,
      default: "Sebagian file berhasil diupload"
    },
    uploadFailedMessage: {
      type: String,
      default: "File gagal diupload"
    },
    noFileToUploadMessage: {
      type: String,
      default: "Mohon pilih minimal 1 file untuk diupload"
    }
  },

  data: () => ({
    // Single file upload.
    fileToBeUploaded: null,
    // Multiple file upload.
    filesToBeUploaded: [],
    // Should contains array of objects.
    additionalData: [],

    // File ID retrieved from value and successful upload process.
    existingFileId: "", // To support single file.
    existingFileIds: [], // To support multiple file.

    // Supporting data.
    successfulUploadResult: null, // To support single file.
    successfulUploadResults: [], // To support multiple file.
    errorMessage: ""
  }),

  computed: {
    /**
     * Detect whether value is set or not.
     */
    isValueSet() {
      let vm = this;
      if (typeof vm.value == "object") {
        return !!vm.value.length;
      } else if (typeof vm.value == "string" || typeof vm.value == "number") {
        return !!vm.value;
      } else {
        return false;
      }
    },

    /**
     * Detect whether the value is a single value and present.
     */
    hasSingleValue() {
      if (typeof this.value == "string" || typeof this.value == "number") {
        return !!this.value;
      } else {
        return false;
      }
    },

    /**
     * Detect whether the value is multiple and present.
     */
    hasMultipleValues() {
      if (typeof this.value == "object") {
        return !!this.value.length;
      } else {
        return false;
      }
    }
  },

  watch: {
    /**
     * Register ID(s) contained in the value.
     */
    value(newValue, oldValue) {
      let vm = this;
      if (typeof newValue == "object") {
        for (let valueIndex = 0; valueIndex < newValue.length; valueIndex++) {
          const newValueRow = newValue[valueIndex];
          if (typeof newValueRow == "object") {
            vm.existingFileIds.push(newValueRow[vm.idIndex]);
          } else {
            vm.existingFileIds.push(newValueRow);
          }
        }
      } else {
        vm.existingFileId = newValue;
      }
    },

    /**
     * Send the uploaded file ID to the parent component.
     */
    successfulUploadResult(resultAfter, resultBefore) {
      if (this.returnId) {
        this.$emit("input", resultAfter[this.idIndex]);
      } else {
        this.$emit("input", resultAfter);
      }
    },

    /**
     * To emit files uploaded successfully event and send the received data
     * from the API server to the parent component.
     */
    successfulUploadResults(resultsAfter, resultsBefore) {
      if (!!resultsAfter.length) {
        let vm = this,
          updatedValues = vm.value;
        for (
          let resultIndex = 0;
          resultIndex < resultsAfter.length;
          resultIndex++
        ) {
          const result = resultsAfter[resultIndex];
          updatedValues.push(result);
          vm.existingFileIds.push(result[vm.idIndex]);
        }

        if (vm.returnId) {
          vm.$emit("input", vm.existingFileIds);
        } else {
          vm.$emit("input", updatedValues);
        }
      }
    }
  },

  methods: {
    /**
     * Begin transmitting a file to API server.
     * @returns void
     */
    beginUploadFile() {
      let vm = this;

      vm.upload(vm.fileToBeUploaded, vm.additionalData)
        .then(function(result) {
          vm.successfulUploadResult = result;
          vm.$emit("file-uploaded", result);
        })
        .catch(function(result) {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.invalidInputMessageExtractToText(result)
          });
        })
        .finally(function() {
          vm.resetState();
        });
    },

    /**
     * Begin transmitting multiple files to API server.
     * @return void
     */
    beginUploadFiles() {
      let vm = this;

      /**
       * Multiple upload.
       * Modification from this article:
       * https://bilalbudhani.com/upload-multiple-files-to-cloudinary-using-react-dropzone-axios/
       */
      const uploaderStatuses = vm.filesToBeUploaded.map(function(file) {
        return vm
          .upload(file, vm.additionalData)
          .then(function(result) {
            return result;
          })
          .catch(function(result) {
            vm.errorMessage = vm.invalidInputMessageExtractToText(result);
          });
      });

      Promise.all(uploaderStatuses)
        .then(function(results) {
          results.forEach(result => {
            if (result != null) {
              vm.successfulUploadResults.push(result);
              vm.$emit("file-uploaded", result);
            }
          });

          // Emit files-uploaded event.
          vm.$emit("files-uploaded", vm.successfulUploadResults);
          vm.showNotificationAfterUpload();
        })
        .catch(function() {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.uploadFailedMessage
          });
        })
        .finally(function() {
          vm.resetState();
        });
    },

    /**
     * Show notification after upload process is finished.
     * @return {void}
     */
    showNotificationAfterUpload() {
      let vm = this,
        filesToBeUploadedCount = vm.filesToBeUploaded.length,
        successfulUploadResultsCount = vm.successfulUploadResults.length;

      if (filesToBeUploadedCount == 0) {
        vm.$store.commit("global-snackbar/show", {
          color: "error",
          message: vm.noFileToUploadMessage
        });
      } else if (successfulUploadResultsCount == filesToBeUploadedCount) {
        vm.$store.commit("global-snackbar/show", {
          color: "success",
          message: vm.uploadSuccessMessage
        });
      } else if (successfulUploadResultsCount == 0) {
        vm.$store.commit("global-snackbar/show", {
          color: "error",
          message: vm.uploadFailedMessage + ": " + vm.errorMessage
        });
      } else {
        vm.$store.commit("global-snackbar/show", {
          color: "warning",
          message: vm.uploadPartiallySuccessMessage + ": " + vm.errorMessage
        });
      }
    },

    /**
     * Delete a uploaded file by its' ID.
     * @param {Number|String} idToDelete File ID emitted by file card.
     */
    deleteFileById(idToDelete) {
      let vm = this;

      if (vm.hasSingleValue) {
        vm.$emit("input", undefined);
      } else if (vm.hasMultipleValues) {
        for (let valueIndex = 0; valueIndex < vm.value.length; valueIndex++) {
          const valueRow = vm.value[valueIndex];
          if (valueRow == idToDelete) {
            vm.value.splice(valueIndex, 1);
            valueIndex--;
          }
        }
        vm.$emit("input", vm.value);
      }
    },

    /**
     * Reset the control state to the begining.
     * @return {void}
     */
    resetState() {
      let vm = this;
      vm.fileToBeUploaded = null;
      vm.filesToBeUploaded = [];
      vm.additionalData = [];
      vm.successfulUploadResults = [];
    }
  }
};
