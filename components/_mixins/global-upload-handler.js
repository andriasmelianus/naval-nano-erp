/**
 * Provide the minimal properties for upload control.
 */
import { MessageExtractor } from "./message-extractor";
import { Uploader } from "./uploader";
import { InvalidInputMessageHandler } from "./form/invalid-input-message-handler";
export const GlobalUploadHandler = {
  mixins: [MessageExtractor, Uploader, InvalidInputMessageHandler],

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
     * but it should /product/image/{image_id}.
     */
    parentResourceUri: {
      type: String,
      required: true
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
    additionalData: [],

    // Supporting data.
    _uploadedIds: undefined,
    _successfullyUploadedFilesCount: 0
  }),

  methods: {
    /**
     * Perform upload operation via Axios POST request.
     * @return void
     */
    upload() {
      let vm = this;

      /**
       * Multiple upload.
       * Modification from this article:
       * https://bilalbudhani.com/upload-multiple-files-to-cloudinary-using-react-dropzone-axios/
       */
      const uploaderStatuses = vm.files.map(function(file) {
        return vm
          .beginUploadFile(file, vm.additionalData)
          .then(function(result) {
            vm._successfullyUploadedFilesCount++;
          })
          .catch(function(result) {
            vm.invalidInputMessageExtract(result);
          });
      });

      Promise.all(uploaderStatuses)
        .then(function(results) {
          console.log(results);

          if (vm.files.length == vm._successfullyUploadedFilesCount) {
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
