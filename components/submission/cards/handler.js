import { GlobalCardHandler } from "~/components/_mixins/global-card-handler";
import { DefaultRecord } from "../record";
import { Downloader } from "~/components/_mixins/downloader";
export const Handler = {
  mixins: [GlobalCardHandler, Downloader],

  props: {
    record: {
      type: Object,
      default: function() {
        return DefaultRecord;
      }
    },

    /**
     * Since keyword "file/files" causing keyword conflicts with Laravel Request,
     * field name sent from NuxtJS will be attachments,
     * but received field name is still files.
     * This props will catch submission data which contains "files" field within.
     * This props also give flexibility if field name change is made in the server side.
     */
    attachmentsIndex: {
      type: String,
      default: "files"
    },

    /**
     * A file resource URI to perform download operation.
     * Since here is a submission domain, calling resourceUri will return an URI for submission.
     * So we need to add resourceUri for attachment particularly.
     */
    attachmentResourceUri: {
      type: String,
      default: "file"
    }
  },

  methods: {
    /**
     * Catch click event and transfer it to the parent component.
     * @return {void}
     */
    handleCardClicked() {
      this.$emit("card-clicked", this.record);
    },

    /**
     *
     * @param {Object} attachment File object retrieved from API server.
     */
    downloadAttachment(attachmentId, attachmentName) {
      let vm = this;
      vm.beginDownload(
        vm.attachmentResourceUri + "/download/" + attachmentId,
        attachmentName
      );
    }
  }
};
