import { GlobalDataTableHandler } from "./global-data-table-handler";
export const GlobalServerSideDataTableHandler = {
  mixins: [GlobalDataTableHandler],

  data: () => ({
    // Stores the total record fetched from API
    recordsTotal: undefined,

    // Parameters to be sent to the API server
    serverParams: {},
    otherServerParams: {},

    // Other supporting data
    dataFetchTimerId: undefined,
    dataFetchTimerDelay: 300,
    isLoading: false
  }),

  computed: {
    resourceUriForVuetifyServerSideDataTable() {
      return this.resourceUri + "/vuetify-data-table";
    }
  },

  watch: {
    /**
     * Perform API data fetch when searchKeyword is changed.
     * @param {String} newSearchKeywords Newly typed search keyword
     * @param {String} oldSearchKeywords Previous typed search keyword
     */
    searchKeyword(newSearchKeywords, oldSearchKeywords) {
      let vm = this;

      /**
       * Give delay before actually perform otherServerParams object assigment.
       */
      clearTimeout(vm.dataFetchTimerId);
      vm.dataFetchTimerId = setTimeout(function() {
        vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
          searchKeyword: newSearchKeywords
        });
      }, vm.dataFetchTimerDelay);
    },

    /**
     * Perform API data fetch when serverParams is changed.
     */
    serverParams: {
      handler() {
        this.readRecords();
      },
      deep: true
    },

    /**
     * Perform API data fetch when otherServerParams is changed.
     */
    otherServerParams: {
      handler() {
        this.readRecords();
      },
      deep: true
    }
  },

  methods: {
    /**
     * Override the original readRecords method from GlobalDataTableHandler.
     */
    readRecords() {
      let vm = this,
        allParams = Object.assign(
          {},
          this.serverParams,
          this.otherServerParams
        );

      vm.isLoading = true;
      vm.$axios
        .$get(vm.resourceUriForVuetifyServerSideDataTable, {
          params: allParams
        })
        .then(function(result) {
          vm.records = result.data;
          vm.recordsTotal = result.total;
          vm.isLoading = false;
        })
        .catch(function(result) {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.messageErrorExtract(result)
          });
        });
    },

    /**
     * Handle the create record operation.
     * @param {Object} createdRecord Created record received from API
     */
    handleRecordCreated(createdRecord) {
      this.readRecords();
      this.closeForm();
    },

    /**
     * Handle the update record operation.
     * @param {Object} updatedRecord Updated record received from API
     */
    handleRecordUpdated(updatedRecord) {
      this.selectedRecord = Object.assign(
        {},
        this.selectedRecord,
        updatedRecord.data
      );
      this.records.splice(this.selectedRecordIndex, 1, updatedRecord.data);
      if (this.reloadAfterModification) {
        this.readRecords();
      }
      this.closeForm();
    },

    /**
     * Delete the first selected data from the data table.
     */
    deleteSingleRecord() {
      if (confirm("Anda yakin akan menghapus data tersebut?")) {
        let vm = this;

        vm.$axios
          .$delete(vm.resourceUri + "/" + vm.selectedRecord.id)
          .then(function(result) {
            vm.readRecords();
            vm.selectedRecords = [];

            vm.$emit("record-selected", []);

            vm.$store.commit("global-snackbar/show", {
              color: "success",
              message: vm.messageSuccessExtract(result)
            });
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
