import { MessageExtractor } from "~/components/_mixins/message-extractor";
export const Handler = {
  mixins: [MessageExtractor],

  props: {
    resourceUri: {
      type: String,
      required: true,
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
      type: String,
      required: true
    },

    id: {
      type: Number,
      required: true
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
    id(newId, oldId) {
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
      vm.$axios
        .$get(vm.resourceUri + "/base64/" + vm.id, {
          params: {
            width: vm.width,
            height: vm.height
          }
        })
        .then(function(result) {
          vm.source = result;
        })
        .catch(function(result) {
          console.error(result);
        });
    },

    /**
     * Perform delete request when delete button is clicked.
     * @return {void}
     */
    handleDeleteButtonClicked() {
      let vm = this;
      vm.$emit("delete-button-clicked", vm.id);
      vm.$axios
        .$delete(vm.parentResourceUri + "/" + vm.resourceUri + "/" + vm.id)
        .then(function(result) {
          vm.source = undefined;
          vm.$emit("deleted", vm.id, result);
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
