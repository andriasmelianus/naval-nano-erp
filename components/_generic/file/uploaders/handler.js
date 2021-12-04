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

    idIndex: {
      type: String,
      default: "id"
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
     * Remove choosen element from array.
     * Transfer emitted delete-button-clicked event from file card to parent component.
     * @param {String|Number} idToDelete File ID emitted by file card.
     */
    handleDeleteButtonClicked(idToDelete) {
      this.$emit("delete-button-clicked", idToDelete);
    }
  }
};
