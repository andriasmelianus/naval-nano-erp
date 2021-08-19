import { MessageExtractor } from "~/components/_mixins/message-extractor";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [MessageExtractor, DefaultRecord],

  props: {
    user: {
      type: Object,
      default: function() {
        return {
          id: 0
        };
      }
    }
  },

  data: () => ({
    resourceUriForVuetifyList: "/role/vuetify-list-for-role-user",

    records: []
  }),

  watch: {
    user(newUser, oldUser) {
      let vm = this;

      vm.$axios
        .$get(vm.resourceUriForVuetifyList, {
          params: { user_id: newUser.id }
        })
        .then(function(result) {
          vm.records = result;
        })
        .catch(function(result) {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.errorMessageExtract(result)
          });
        });
    }
  }
};
