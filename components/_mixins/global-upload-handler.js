/**
 * Provide the minimal properties for upload control.
 * v-model accepts file ID(s) in a String/Number/Array and an file object (data from API server containing ID field).
 *
 * PROPS:
 * place-holder {String}
 * accept {String}
 * multiple {Boolean}
 * parent-resource-uri {String}
 * return-id {Boolean}
 * id-index {String}
 * upload-success-message {String}
 * upload-partially-success-message {String}
 * upload-failed-message {String}
 * no-file-to-upload-message {String}
 *
 * DATA:
 * filesToBeUploaded {Array}
 * additionalData {Array}
 * existingFileIds {Array}
 * successfulUploadResults {Array}
 * errorMessage {String}
 *
 * METHODS:
 * beginUploadFile {void}
 * beginUploadFiles {void}
 * showNotificationAfterUpload {void}
 * deleteFileById {void}
 * resetState {void}
 */
import { MessageExtractor } from "./message-extractor";
import { TypeDetector } from "./type-detector";
import { Uploader } from "./uploader";
export const GlobalUploadHandler = {
  mixins: [MessageExtractor, TypeDetector, Uploader],

  props: {
    /**
     * Enable v-model directive support.
     * Value can be a single or multiple file IDs.
     *
     */
    value: {
      type: [String, Number, Object, Array]
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
     * Decide whether the control accepts multiple files upload.
     */
    multiple: {
      type: Boolean,
      default: false
    },

    /**
     * API URI of the parent component.
     * This URI needed to form the deletion process.
     * If this component is used by product component,
     * then the deletion URI cannot be /file/{file_id},
     * but it should be /product/file/{file_id},
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
    idProperty: {
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
    // Multiple file upload.
    filesToBeUploaded: [],
    // Should contains array of objects.
    additionalData: [],

    // File ID retrieved from value and successful upload process.
    existingFileIds: [], // To support multiple file.

    // Supporting data.
    successfulUploadResults: [], // To support multiple file.
    errorMessage: ""
  }),

  computed: {
    /**
     * Detect whether value is set or not.
     * @returns {Boolean}
     */
    isValueSet() {
      let vm = this;
      if (vm.isUndefined(vm.value)) {
        return false;
      } else {
        if (vm.isArray(vm.value)) {
          return !!vm.value.length;
        } else if (vm.isObject(vm.value)) {
          return !!Object.keys(vm.value).length;
        } else {
          return !!vm.value;
        }
      }
    },

    /**
     * Detect whether the value is a single value and present.
     * Array with a single element is considered as single value.
     * @returns {Boolean}
     */
    hasSingleValue() {
      if (this.isArray(this.value)) {
        return this.value.length == 1;
      } else {
        return true;
      }
    },

    /**
     * Detect whether the value is multiple and present.
     * @returns {Boolean}
     */
    hasMultipleValues() {
      if (this.isArray(this.value)) {
        return this.value.length > 1;
      } else {
        return false;
      }
    }
  },

  watch: {
    /**
     * To emit files uploaded successfully event and send the received data
     * from the API server to the parent component.
     */
    successfulUploadResults(newUploadResults, oldUploadResults) {
      if (!!newUploadResults.length) {
        let vm = this,
          newValues = vm.isUndefined(vm.value)
            ? []
            : vm.isArray(vm.value)
            ? vm.value
            : [vm.value];

        for (
          let newUploadResultsIndex = 0;
          newUploadResultsIndex < newUploadResults.length;
          newUploadResultsIndex++
        ) {
          const result = newUploadResults[newUploadResultsIndex];

          vm.existingFileIds.push(result[vm.idProperty]);
          newValues.push(result);
        }

        if (vm.multiple) {
          vm.$emit("input", vm.returnId ? vm.existingFileIds : newValues);
        } else {
          let indexLastExistingFileIds = vm.existingFileIds.length - 1,
            indexLastNewValues = newValues.length - 1;

          vm.$emit(
            "input",
            vm.returnId
              ? vm.existingFileIds[indexLastExistingFileIds]
              : newValues[indexLastNewValues]
          );
        }
      }
    }
  },

  mounted() {
    this.loadExistingFileIds();
  },

  methods: {
    /**
     * Load existing file ID(s) passed from v-model/value props.
     * @returns {void}
     */
    loadExistingFileIds() {
      let vm = this;
      if (vm.isUndefined(vm.value)) {
        vm.existingFileIds = [];
      } else {
        if (vm.isArray(vm.value)) {
          for (let valueIndex = 0; valueIndex < vm.value.length; valueIndex++) {
            const newValueRow = vm.value[valueIndex];
            if (vm.isObject(newValueRow)) {
              vm.existingFileIds.push(newValueRow[vm.idProperty]);
            } else {
              vm.existingFileIds.push(newValueRow);
            }
          }
        } else {
          if (vm.isObject(vm.value)) {
            vm.existingFileIds.push(vm.value[vm.idProperty]);
          } else {
            vm.existingFileIds.push(vm.value);
          }
        }
      }
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
          let tmpValidResults = [];

          results.forEach(result => {
            if (!vm.isUndefined(result)) {
              tmpValidResults.push(result);
              vm.$emit("file-uploaded", result);
            }
          });

          // Merge newly successful results with successfulUploadResults.
          vm.successfulUploadResults = tmpValidResults;
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
      let vm = this,
        newValues = vm.value;

      if (vm.hasSingleValue) {
        vm.$emit("input", undefined);
      } else if (vm.hasMultipleValues) {
        let valueIndexToDelete = undefined;

        for (let valueIndex = 0; valueIndex < newValues.length; valueIndex++) {
          const valueRow = newValues[valueIndex];

          if (vm.isObject(valueRow)) {
            if (idToDelete == valueRow[vm.idProperty]) {
              valueIndexToDelete = valueIndex;
            }
          } else {
            if (idToDelete == valueRow) {
              valueIndexToDelete = valueIndex;
            }
          }
        }

        if (valueIndexToDelete != undefined) {
          newValues.splice(valueIndexToDelete, 1);
          vm.$emit("input", newValues);
        }
      }
    },

    /**
     * Reset the control state to the begining.
     * @return {void}
     */
    resetState() {
      let vm = this;
      vm.filesToBeUploaded = [];
      vm.additionalData = [];
      vm.successfulUploadResults = [];
    }
  }
};
