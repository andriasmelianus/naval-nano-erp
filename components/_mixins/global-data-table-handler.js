export const GlobalDataTableHandler = {
    props: {
        filter: Object
    },

    data: () => ({
        // Table headers.
        headers: [],
        smallHeaders: [],
        singleColumnHeader: [],

        // Table data.
        records: undefined,
        selectedRecords: [],
        selectedRecord: {},
        selectedRecordIndex: undefined,
        defaultRecord: {},
        editedRecord: {},
        searchKeywords: "",

        // API Resource URI.
        resourceUri: "",

        // To support operation related to form.
        formIsShown: false,
        formIsInEditMode: false,

        // If true, table will reload data after a row is modified.
        reloadAfterModification: false
    }),

    computed: {
        /**
         * Return true when record is selected.
         * @returns boolean
         */
        selectedRecordExists() {
            return this.selectedRecords.length > 0;
        }
    },

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
        }
    },

    methods: {
        /**
         * Fetch data from API.
         */
        readRecords() {
            let vm = this;

            vm.$axios
                .$get(vm.resourceUri, {
                    params: vm.filter
                })
                .then(function (result) {
                    vm.records = result;
                })
                .catch(function (result) {
                    vm.$store.commit("global-snackbar/show", {
                        color: "error",
                        message: result
                    });
                });
        },

        /**
         * Set the editedRecord
         * @param {Object} editedRecord
         */
        setEditedRecord(editedRecord) {
            this.editedRecord = Object.assign({}, this.editedRecord, editedRecord);
        },

        /**
         * Emit a "recordSelected" event when a record is selected.
         * @param {Object} context
         */
        handleRecordSelected(context) {
            this.$emit("recordSelected", context);
        },

        /**
         * Handle the recordCreated event fired from a form.
         * @param {Object} createdRecord
         */
        handleRecordCreated(createdRecord) {
            // Add createdRecord to records
            let recordsCount = this.records.length;
            this.records.splice(recordsCount, 0, createdRecord);
            this.closeForm();

            if (this.reloadAfterModification) {
                this.readRecords();
            }
        },

        /**
         * Handle the recordUpdated event fired from a form.
         * @param {Object} updatedRecord
         */
        handleRecordUpdated(updatedRecord) {
            this.selectedRecord = Object.assign(
                {},
                this.selectedRecord,
                updatedRecord
            );
            this.records.splice(this.selectedRecordIndex, 1, updatedRecord);
            this.closeForm();

            if (this.reloadAfterModification) {
                this.readRecords();
            }
        },

        /**
         * Delete the first selected record.
         */
        deleteSingleRecord() {
            if (confirm("Anda yakin akan menghapus data tersebut?")) {
                let vm = this;
                vm.$axios
                    .$delete(vm.resourceUri + '/' + vm.selectedRecord.id)
                    .then(function (result) {
                        vm.records.splice(vm.selectedRecordIndex, 1);
                        vm.selectedRecords = [];

                        vm.$emit("recordSelected", []);
                    })
                    .catch(function (result) {
                        vm.$store.commit("global-snackbar/show", {
                            color: "error",
                            message: result
                        });
                    });

                if (this.reloadAfterModification) {
                    this.readRecords();
                }
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
                    selectedIds = vm.selectedRecords.map(function (selectedRecords) {
                        return selectedRecords["id"];
                    });

                vm.$axios
                    .$delete(vm.resourceUri, {
                        params: {
                            ids: selectedIds
                        }
                    })
                    .then(function (result) {
                        vm.readRecords();
                        vm.selectedRecords = [];

                        vm.$emit("recordSelected", []);
                    })
                    .catch(function (result) {
                        vm.$store.commit("globalNotification/show", {
                            color: "error",
                            message: result
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
