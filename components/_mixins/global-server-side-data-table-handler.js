import { GlobalDataTableHandler } from './global-data-table-handler';
export const GlobalServerSideDataTableHandler = {
    mixins: [GlobalDataTableHandler],

    data: () => ({
        // Stores the total record fetched from API
        recordsTotal: undefined,

        // Parameters to be sent to the API server
        serverParams: {},
        otherServerParams: {},

        // Other supporting data
        _timerId: undefined,
        _timerDelay: 300,
        _isLoading: false
    }),

    watch: {
        /**
         * Perform API data fetch when searchKeywords is changed.
         * @param {String} newSearchKeywords Newly typed search keyword
         * @param {String} oldSearchKeywords Previous typed search keyword
         */
        searchKeywords(newSearchKeywords, oldSearchKeywords) {
            let vm = this

            /**
             * Give delay before actually perform otherServerParams object assigment.
             */
            clearTimeout(vm._timerId);
            vm._timerId = setTimeout(function () {
                vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
                    searchKeywords: newSearchKeywords
                });
            }, vm._timerDelay);
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
                allParams = Object.assign({}, this.serverParams, this.otherServerParams);

            vm._isLoading = true
            vm.$axios.$get(vm.resourceUri, { params: allParams })
                .then(function (result) {
                    vm.records = result.data;
                    vm.recordsTotal = result.total;
                    vm._isLoading = false;
                })
                .catch(function (result) {
                    vm.$store.commit('global-snackbar/show', {
                        color: 'error',
                        message: result
                    })
                })
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
                updatedRecord
            );
            this.readRecords();
            this.closeForm();
        },

        /**
         * Delete the first selected data from the data table.
         */
        deleteSingleRecord() {
            if (confirm('Anda yakin akan menghapus data tersebut?')) {
                let vm = this

                vm.$axios.$delete(vm.resourceUri, { params: { id: vm.selectedRecord.id } })
                    .then(function (result) {
                        vm.readRecords();
                        vm.selectedRecords = [];

                        vm.$emit('recordSelected', []);
                    })
                    .catch(function (result) {
                        vm.$store.commit('global-snackbar/show', {
                            color: 'error',
                            message: result
                        })
                    })
            }
        }
    }
}