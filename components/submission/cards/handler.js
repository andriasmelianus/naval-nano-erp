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

    attachmentResourceUri: {
      type: String,
      default: "file"
    }
  },

  data: vm => ({
    attachmentsData: []
  }),

  mounted() {
    let vm = this,
      attachmentRequests = [];
    vm.record.attachments.forEach(fileId => {
      attachmentRequests.push(
        vm.$axios
          .$get(vm.attachmentResourceUri + "/" + fileId)
          .then(function(result) {
            return result;
          })
          .catch(function(result) {
            return result;
          })
      );
    });

    Promise.all(attachmentRequests).then(function(result) {
      vm.attachmentsData = result;
    });
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
