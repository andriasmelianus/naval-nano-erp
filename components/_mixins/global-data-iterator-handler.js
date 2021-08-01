/**
 * Global Data Iterator Handler.
 * This mixin can be used by all v-data-iterator components.
 * This mixin always be server-side pagination and sorting.
 */
import { MessageExtractor } from "~/components/_mixins/message-extractor";
export const GlobalDataIteratorHandler = {
  mixins: [MessageExtractor],

  props: {
    filter: Object
  },

  data: () => ({
    // Data Iterator Header
    sortableColumns: [], // Sample value: {text: "Nama", value: "name"}
    sortColumn: "", // Vue Data Iterator component is recommended only using 1 sorted column.
    sortDesc: "false",

    // Data.
    records: undefined,
    recordsTotal: undefined,
    selectedRecords: [],
    selectedRecord: {},
    selectedRecordIndex: undefined,
    defaultRecord: {},
    editedRecord: {},
    searchKeywords: "",

    // API Resource URI.
    resourceUri: "",
    serverParams: {},
    otherServerParams: {},

    // To support operation related to form.
    formIsShown: false,
    formIsInEditMode: false,

    // If true, table will reload data after a row is modified.
    reloadAfterModification: false,

    // Other supporting data
    dataFetchTimerId: undefined,
    dataFetchTimerDelay: 300,
    isLoading: false
  }),

  watch: {
    /**
     * Fetch data from server when filter is changed.
     * @param {Object} newFilter
     * @param {Object} oldFilter
     */
    filter(newFilter, oldFilter) {
      this.readRecords();
    },

    /**
     * Perform readRecords() everytime sortColumn is changed by changing otherServerParams property.
     * sortColumn is assigned to otherServerParams because Vuetify Data Iterator is unlike the Data Table.
     * Data Iterator doesn't have built-in column to provide sortBy and sortDesc property to be sent to API server.
     * @param {String} newSortColumn New selected column to be sort.
     * @param {String} oldSortColumn Old selected column to be sort.
     */
    sortColumn(newSortColumn, oldSortColumn) {
      this.otherServerParams = Object.assign({}, this.otherServerParams, {
        sortBy: newSortColumn
      });
    },

    /**
     * Perform readRecords() everytime sortDesc is changed by changing otherServerParams property.
     * sortDesc is assigned to otherServerParams because Vuetify Data Iterator is unlike the Data Table.
     * Data Iterator doesn't have built-in column to provide sortBy and sortDesc property to be sent to API server.
     * @param {String} newSortDescValue New value for sortDesc property.
     * @param {String} oldSortDescValue Old value for sortDesc property.
     */
    sortDesc(newSortDescValue, oldSortDescValue) {
      this.otherServerParams = Object.assign({}, this.otherServerParams, {
        sortDesc: newSortDescValue
      });
    },

    /**
     * When multiple records are selected.
     * The first record will be assigned to selectedRecord.
     * @param {Object} newSelectedRecords
     * @param {Object} oldSelectedRecords
     */
    selectedRecords(newSelectedRecords, oldSelectedRecords) {
      this.selectedRecord = Object.assign(
        {},
        this.selectedRecord,
        newSelectedRecords[0]
      );
      this.selectedRecordIndex = this.records.indexOf(newSelectedRecords[0]);
    },

    /**
     * To close the shown form.
     * @param {Object} newStatus
     * @param {Object} oldStatus
     */
    formIsShown(newStatus, oldStatus) {
      if (!newStatus) {
        this.closeForm();
      }
    },

    /**
     * Perform API data fetch when searchKeywords is changed.
     * @param {String} newSearchKeywords Newly typed search keyword
     * @param {String} oldSearchKeywords Previous typed search keyword
     */
    searchKeywords(newSearchKeywords, oldSearchKeywords) {
      let vm = this;

      /**
       * Give delay before actually perform otherServerParams object assigment.
       */
      clearTimeout(vm.dataFetchTimerId);
      vm.dataFetchTimerId = setTimeout(function() {
        vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
          searchKeywords: newSearchKeywords
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

  computed: {
    /**
     * Provide custom URI to fetch data for v-data-table or v-data-iterator.
     */
    resourceUriForVuetifyServerSideDataTable() {
      return this.resourceUri + "/vuetify-data-iterator";
    },

    /**
     * Return true when record is selected.
     * @returns boolean
     */
    selectedRecordExists() {
      return this.selectedRecords.length > 0;
    }
  },

  mounted() {
    let vm = this;

    /**
     * Provide initial sort column if sortableColumns is provided.
     * Initial sort column is the first [0] object in the sortableColumns.
     */
    if (vm.sortableColumns.length > 0) {
      vm.sortColumn = vm.sortableColumns[0].value;
    }
  },

  methods: {
    /**
     * Fetch data from API.
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
     * Set the editedRecord
     * @param {Object} editedRecord
     */
    setEditedRecord(editedRecord) {
      this.editedRecord = Object.assign({}, this.editedRecord, editedRecord);
    },

    /**
     * Emit a "record-selected" event when a record is selected.
     * @param {Object} context
     */
    handleRecordSelected(context) {
      this.$emit("record-selected", context);
    },

    /**
     * Delete the first selected record.
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
    },

    /**
     * Delete multiple selected records.
     * This function will send the IDs to be deleted.
     * Parameter name will be: ids.
     */
    deleteMultipleRecords() {
      if (confirm("Anda yakin akan menghapus data tersebut?")) {
        let vm = this,
          selectedIds = vm.selectedRecords.map(function(selectedRecords) {
            return selectedRecords["id"];
          });

        vm.$axios
          .$delete(vm.resourceUri, {
            params: {
              ids: selectedIds
            }
          })
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
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: vm.messageErrorExtract(result)
            });
          });

        if (this.reloadAfterModification) {
          this.readRecords();
        }
      }
    },

    /**
     * Show the form.
     * @param {Boolean} editMode
     */
    showForm(editMode) {
      if (editMode) {
        this.setEditedRecord(this.selectedRecord);
      } else {
        this.setEditedRecord(this.defaultRecord);
      }
      this.formIsInEditMode = editMode;
      this.formIsShown = true;
    },

    /**
     * Close the form.
     */
    closeForm() {
      this.formIsInEditMode = false;
      this.formIsShown = false;
    }
  }
};
