import { MessageExtractor } from "~/components/_mixins/message-extractor";
import { URL } from "~/components/_mixins/url";
export const Handler = {
  mixins: [MessageExtractor, URL],

  props: {
    resourceUri: {
      type: String,
      default: "file"
    },

    parentResourceUri: String,

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

    deletable: {
      type: Boolean,
      default: false
    },

    width: {
      type: Number,
      default: undefined
    },

    height: {
      type: Number,
      default: undefined
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
        return vm.value.split(".").pop();
      } else {
        if (vm.record == undefined) {
          return undefined;
        } else {
          return vm.record.name.split(".").pop();
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
     * Perform delete request when delete button is clicked.
     * @return {void}
     */
    handleDeleteButtonClicked() {
      let vm = this;
      vm.$emit("input", undefined);
    }
  }
};
