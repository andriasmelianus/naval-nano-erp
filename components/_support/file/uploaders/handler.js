import { GlobalUploadHandler } from "~/components/_mixins/global-upload-handler";
export const Handler = {
  mixins: [GlobalUploadHandler],

  props: {
    placeHolder: {
      type: String,
      default: "Pilih file"
    },

    accept: {
      type: String,
      default: undefined
    },

    resourceUri: {
      type: String,
      default: "/file"
    },

    /**
     * Useful for delete operation without sending DELETE request.
     * Usually used by single image upload, where delete means set the ID to undefined only.
     */
    disableDeleteRequest: {
      type: Boolean,
      default: false
    },

    downloadable: {
      type: Boolean,
      default: true
    },

    deletable: {
      type: Boolean,
      default: true
    },

    fieldName: {
      type: String,
      default: "file"
    },

    prependIcon: {
      type: String,
      default: "mdi-file"
    },

    /**
     * Card width of the uploaded file.
     */
    cardWidth: {
      type: [String, Number]
    },

    /**
     * Card height of the uploaded file.
     */
    cardHeight: {
      type: [String, Number]
    },

    iconSize: {
      type: Number,
      default: 64
    }
  },

  data: () => ({
    description: ""
  }),

  watch: {
    /**
     * Add additional parameter to the upload request.
     * @param {String} newDescription Newly typed description.
     * @param {String} oldDescription Previous value of description.
     */
    description(newDescription, oldDescription) {
      this.additionalData[0] = { description: newDescription };
    }
  },

  methods: {
    /**
     * Transfer event fired from file card to the parent component.
     * @param {Number|String} idToDelete
     */
    handleDeleteButtonClicked(idToDelete) {
      let vm = this;
      if (!vm.deletable) {
        vm.$emit("delete-button-clicked", idToDelete);
      }
    }
  }
};
