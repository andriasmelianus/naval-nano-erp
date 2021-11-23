import { GlobalFormHandler } from "~/components/_mixins/global-form-handler";
import { DefaultRecord, DefaultInvalidInputMessage } from "../record";
export const Handler = {
  mixins: [GlobalFormHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/submission"
    },

    record: {
      type: Object,
      default: function() {
        return DefaultRecord;
      }
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage,

    entities: []
  }),

  mounted() {
    let vm = this;
    vm.$axios
      .$get(vm.resourceUri + "/entities")
      .then(function(result) {
        vm.entities = result;
      })
      .catch(function(result) {
        vm.$store.commit("global-snackbar/show", {
          color: "error",
          message: vm.messageErrorExtract(result)
        });
      });
  }
};
