/**
 * Provide standard form handler. Including POST and PUT/PATCH operation.
 */
import { MessageExtractor } from '~/components/_mixins/message-extractor'
import { InvalidInputMessageHandler } from './form/invalid-input-message-handler'
export const GlobalFormHandler = {
    mixins: [MessageExtractor, InvalidInputMessageHandler],

    props: {
        /**
         * Record to be processed with the form.
         */
        record: {
            type: Object,
            default: function () {
                return {}
            }
        },

        /**
         * Whether the form is on edit mode or not.
         * When the value is true, submitted form will make PUT request.
         * Otherwise POST request will be created.
         */
        editMode: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        /**
         * Resource url to perform RESTful operation.
         * A value must be set for this data!
         */
        resourceUri: ''
    }),

    watch: {
        /**
         * Reset invalid input message when record is changed.
         * @param {Object} newRecord newly record from reactivity.
         */
        record(newRecord) {
            this.invalidInputMessageClear();
        }
    },

    methods: {
        /**
         * Submit the form.
         */
        submitForm() {
            this.invalidInputMessageClear();

            if (!this.editMode) {
                this.createRecord(this.record);
            } else {
                this.updateRecord(this.record);
            }
        },

        /**
         * Send the POST request to the server.
         * @param {Object} newRecord The new record input by user
         */
        createRecord(newRecord) {
            let vm = this
            vm.$axios
                .$post(vm.resourceUri, newRecord)
                .then(function (result) {
                    vm.$emit('recordCreated', result);

                    vm.$store.commit('global-snackbar/show', {
                        color: 'success',
                        message: vm.messageSuccessExtract(result)
                    });
                })
                .catch(function (result) {
                    vm.invalidInputMessageExtract(result);
                })
        },

        /**
         * Send the PUT request to the server.
         * @param {Object} updatedRecord Record updated from user
         */
        updateRecord(updatedRecord) {
            let vm = this
            vm.$axios
                .$put(vm.resourceUri + '/' + updatedRecord.id, updatedRecord)
                .then(function (result) {
                    vm.$emit('recordUpdated', result);

                    vm.$store.commit('global-snackbar/show', {
                        color: 'success',
                        message: vm.messageSuccessExtract(result)
                    });
                })
                .catch(function (result) {
                    vm.invalidInputMessageExtract(result);
                })
        }
    }
}