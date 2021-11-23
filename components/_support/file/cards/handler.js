import { MessageExtractor } from "~/components/_mixins/message-extractor";
import { URL } from "~/components/_mixins/url";
import { Downloader } from "~/components/_mixins/downloader";
export const Handler = {
  mixins: [MessageExtractor, URL, Downloader],

  props: {
    resourceUri: {
      type: String,
      default: "file"
    },

    parentResourceUri: String,

    /**
     * If true, pressing delete button will send a DELETE request to API server.
     */
    disableDeleteRequest: {
      type: Boolean,
      default: false
    },

    /**
     * Value can be provided with a valid URL or file ID from the datasource.
     * URL will be filled with "url" property from the fetched data.
     */
    value: {
      type: [String, Number]
    },

    defaultEmptyUrl: {
      type: String,
      default: "#"
    },

    target: {
      type: String,
      default: undefined
    },

    downloadable: {
      type: Boolean,
      default: true
    },

    deletable: {
      type: Boolean,
      default: true
    },

    width: {
      type: [String, Number],
      default: undefined
    },

    height: {
      type: [String, Number],
      default: undefined
    },

    iconSize: {
      type: [String, Number],
      default: 64
    }
  },

  data: () => ({
    record: undefined,

    documentExtensions: [
      "doc",
      "docx",
      "rtf",
      "txt",
      "odf",
      "pdf",
      "epub",
      "rtm",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "pps",
      "ppsx"
    ],
    imageExtensions: ["jpg", "png", "gif", "jpeg", "webp", "bmp"],
    videoExtensions: ["mp4", "mpg", "mov", "mkv"]
  }),

  computed: {
    url() {
      let vm = this;
      if (vm.isValidUrl(vm.value)) {
        return vm.value;
      } else {
        if (vm.record == undefined) {
          return vm.defaultEmptyUrl;
        } else {
          return vm.record.url;
        }
      }
    },

    name() {
      let vm = this;
      if (vm.isValidUrl(vm.value)) {
        return vm.value.split("/").pop();
      } else {
        if (vm.record == undefined) {
          return "?";
        } else {
          return vm.record.name;
        }
      }
    },

    extension() {
      let vm = this;
      if (vm.isValidUrl(vm.value)) {
        return vm.value
          .split(".")
          .pop()
          .toLowerCase();
      } else {
        if (vm.record == undefined) {
          return undefined;
        } else {
          return vm.record.name
            .split(".")
            .pop()
            .toLowerCase();
        }
      }
    },

    icon() {
      let stringIcon = "mdi-file";

      if (this.documentExtensions.includes(this.extension)) {
        stringIcon = "mdi-file-document";
      } else if (this.imageExtensions.includes(this.extension)) {
        stringIcon = "mdi-file-image";
      } else if (this.videoExtensions.includes(this.extension)) {
        stringIcon = "mdi-file-video";
      }

      return stringIcon;
    }
  },

  watch: {
    value(newValue, oldValue) {
      this.getFile();
    }
  },

  mounted() {
    this.getFile();
  },

  methods: {
    /**
     * Fetch file data from datasource.
     * @return {void}
     */
    getFile() {
      let vm = this;
      if (vm.value != null && vm.value != "") {
        if (!vm.isValidUrl(vm.value)) {
          vm.$axios
            .$get(vm.resourceUri + "/" + vm.value)
            .then(function(result) {
              vm.record = result;
              vm.$emit("file-retrieved", vm.value);
            })
            .catch(function(result) {
              vm.$store.commit("global-snackbar/show", {
                color: "error",
                message: vm.messageErrorExtract(result)
              });
            });
        }
      }
    },

    /**
     * Perform get request to download the file.
     * @return {void}
     */
    handleDownloadButtonClicked() {
      let vm = this;
      vm.$emit("download-button-clicked", vm.value);
      if (vm.downloadable) {
        vm.beginDownload(vm.resourceUri + "/download/" + vm.value, vm.name);
      }
    },

    /**
     * Perform delete request when delete button is clicked.
     * @return {void}
     */
    handleDeleteButtonClicked() {
      let vm = this;
      if (confirm("Anda yakin akan menghapus file yang telah diupload?")) {
        if (vm.deletable) {
          vm.$emit("delete-button-clicked", vm.value);

          if (!vm.disableDeleteRequest) {
            vm.$axios
              .$delete(
                vm.parentResourceUri + "/" + vm.resourceUri + "/" + vm.value
              )
              .then(function(result) {
                vm.record = undefined;
                vm.$emit("file-deleted", vm.value);
                vm.$emit("input", undefined);
              })
              .catch(function(result) {
                vm.$store.commit("global-snackbar/show", {
                  color: "error",
                  message: vm.messageErrorExtract(result)
                });
              });
          } else {
            vm.$emit("file-deleted", vm.value);
            vm.$emit("input", undefined);
          }
        } else {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: "Fasilitas penghapusan telah dinonaktifkan."
          });
        }
      }
    }
  }
};
