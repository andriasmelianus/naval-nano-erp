import { GlobalUploadHandler } from "~/components/_mixins/global-upload-handler";
export const Handler = {
  mixins: [GlobalUploadHandler],

  props: {
    placeHolder: {
      type: String,
      default: "Pilih Gambar"
    },

    accept: {
      type: String,
      default: "image/*"
    },

    resourceUri: {
      type: String,
      default: "image"
    },

    /**
     * Useful for delete operation without sending DELETE request.
     * Usually used by single image upload, where delete means set the ID to undefined only.
     */
    disableDeleteRequest: {
      type: Boolean,
      default: false
    },

    returnId: {
      type: Boolean,
      default: true
    },

    fieldName: {
      type: String,
      default: "image"
    },

    namePlaceHolder: {
      type: String,
      default: "Judul Gambar"
    },

    /**
     * Image width to be displayed as uploaded images.
     */
    width: {
      type: Number
    },
    /**
     * Image height to be displayed as uploaded images.
     */
    height: {
      type: Number,
      default: 250
    }
  },

  data: () => ({
    name: ""
  }),

  watch: {
    /**
     * Set the name to additionalData, so it will appended to form data before upload.
     */
    name(newName, oldName) {
      this.additionalData[0] = { name: newName };
    }
  },

  methods: {
    /**
     * Transfer event fired from image card to the parent component.
     * @param {Number} idToDelete
     */
    handleDeleteButtonClicked(idToDelete) {
      let vm = this,
        imageId = vm.disableDeleteRequest ? null : idToDelete;
      this.$emit("delete-button-clicked", imageId);
    }
  }
};
