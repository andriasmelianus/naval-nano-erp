import { MessageExtractor } from "~/components/_mixins/message-extractor";
export const Handler = {
  mixins: [MessageExtractor],

  props: {
    resourceUri: {
      type: String,
      default: "image"
    },

    /**
     * API URI of the parent component.
     * This URI needed to form the deletion process.
     * If this component is used by product component,
     * then the deletion URI cannot be /image/{image_id},
     * but it should /product/image/{image_id}.
     */
    parentResourceUri: {
      type: String
    },

    /**
     * If false, clicking the delete button will send DELETE request to API server.
     */
    disableDeleteRequest: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Number]
    },

    width: {
      type: Number
    },

    height: {
      type: Number,
      default: 250
    }
  },

  data: () => ({
    source: undefined
  }),

  watch: {
    value(newId, oldId) {
      this.getImage();
    }
  },

  mounted() {
    this.getImage();
  },

  methods: {
    /**
     * Get the base64 encoded image.
     * @return {void}
     */
    getImage() {
      let vm = this;
      if (vm.value != null && vm.value != "") {
        vm.$axios
          .$get(vm.resourceUri + "/base64/" + vm.value, {
            params: {
              width: vm.width,
              height: vm.height
            }
          })
          .then(function(result) {
            vm.source = result;
            vm.$emit("image-retrieved", vm.value);
          })
          .catch(function(result) {
            vm.$store.commit("global-snackbar/show", {
              color: "error",
              message: vm.messageErrorExtract(result)
            });
          });
      }
    },

    /**
     * Perform delete request when delete button is clicked.
     * @return {void}
     */
    handleDeleteButtonClicked() {
      let vm = this;
      vm.$emit("delete-button-clicked", vm.id);
      if (!vm.disableDeleteRequest) {
        vm.$axios
          .$delete(vm.parentResourceUri + "/" + vm.resourceUri + "/" + vm.id)
          .then(function(result) {
            vm.source = undefined;
            vm.$emit("input", null);
          })
          .catch(function(result) {
            vm.$store.commit("global-snackbar/show", {
              color: "error",
              message: vm.messageErrorExtract(result)
            });
          });
      }
    }
  }
};
