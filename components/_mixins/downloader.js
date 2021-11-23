/**
 * Enable download ability.
 */
import { MessageExtractor } from "./message-extractor";
export const Downloader = {
  mixins: [MessageExtractor],

  methods: {
    /**
     * Begin download file operation.
     * @param {String} url Download URL
     * @param {String} filename File name to be passed to the browser
     */
    beginDownload(url, filename = "unamed") {
      this.$axios
        .$get(url, {
          responseType: "blob"
        })
        .then(function(result) {
          /**
           * Generic way to perform download operation with Axios.
           * https://stackoverflow.com/a/53230807/7963686
           */
          const url = window.URL.createObjectURL(new Blob([result]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(function(result) {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.messageErrorExtract(result)
          });
        });
    }
  }
};
