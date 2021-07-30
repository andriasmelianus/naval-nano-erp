<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <branch-form
            :record="branchData"
            edit-mode
            @record-updated="branchUpdated"
          ></branch-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import BranchForm from "~/components/branch/forms/default";
export default {
  layout: "dashboard",

  mixins: [MessageExtractor],

  components: {
    BranchForm,
  },

  mounted() {
    let vm = this;
    vm.$axios
      .$get("/branch/" + vm.branchId)
      .then(function (result) {
        vm.branchData = Object.assign({}, vm.branchData, result);
      })
      .catch(function (result) {
        console.log(result);
      });
  },

  data: () => ({
    branchData: {},
  }),

  computed: {
    branchId() {
      return this.$route.params.id;
    },
  },

  methods: {
    branchUpdated(result) {
      let vm = this;
      vm.$store.commit("global-snackbar/show", {
        message: vm.messageSuccessExtract(result),
        color: "success",
      });
    },
  },
};
</script>
