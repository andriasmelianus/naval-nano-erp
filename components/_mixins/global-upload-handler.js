/**
 * Provide the minimal properties for upload control.
 */
import { MessageExtractor } from "./message-extractor";
import { InvalidInputMessageHandler } from "./form/invalid-input-message-handler";
export const GlobalUploadHandler = {
  mixins: [MessageExtractor, InvalidInputMessageHandler],

  props: {
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
     * Field name to hold the file content.
     */
    fieldName: {
      type: String,
      default: "file"
    },

    /**
     * API URI to accept uploaded files.
     */
    resourceUri: {
      type: String,
      default: "file"
    },

    /**
     * API URI of the parent component.
     * This URI needed to form the deletion process.
     * If this component is used by product component,
     * then the deletion URI cannot be /image/{image_id},
     * but it should /product/image/{image_id}.
     */
    parentResourceUri: {
      type: String,
      required: true
    },

    /**
     * Already uploaded file to be shown in the beginning.
     */
    initialIds: {
      type: Array,
      default: function() {
        return [];
      }
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
    }
  },

  data: () => ({
    files: [],

    // Should contains array of objects.
    additionalData: []
  }),

  methods: {
    /**
     * Perform upload operation via Axios POST request.
     * @return void
     */
    upload() {
      let vm = this,
        successfullyUploadedCount = 0;

      /**
       * Multiple file upload.
       * https://bilalbudhani.com/upload-multiple-files-to-cloudinary-using-react-dropzone-axios/
       */
      const uploaders = vm.files.map(function(file) {
        let formData = new FormData();
        formData.append(vm.fieldName, file);

        // Also append additional data to be sent to API server.
        vm.additionalData.forEach(data => {
          let key = Object.keys(data)[0]; // Get the object key.
          formData.append(key, data[key]); // Append the value pairs to the form data.
        });

        return vm.$axios
          .$post(vm.resourceUri, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          })
          .then(function(result) {
            vm.uploadedFiles.push(result);
            successfullyUploadedCount++;
          })
          .catch(function(result) {
            vm.invalidInputMessageExtract(result);
          });
      });

      Promise.all(uploaders)
        .then(function() {
          if (vm.files.length == successfullyUploadedCount) {
            vm.$store.commit("global-snackbar/show", {
              color: "success",
              message: vm.uploadSuccessMessage
            });
          } else if (vm.files.length == 0) {
            vm.$store.commit("global-snackbar/show", {
              color: "error",
              message: vm.uploadFailedMessage
            });
          } else {
            vm.$store.commit("global-snackbar/show", {
              color: "warning",
              message: vm.uploadPartiallySuccessMessage
            });
          }

          vm.files = [];
        })
        .catch(function() {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.uploadFailedMessage
          });
        })
        .finally(function() {
          // Nothing to do. Just to show that Promise has this function :D
        });
    }
  }
};
