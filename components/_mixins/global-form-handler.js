import { MessageHandler } from '~/components/_mixins/message-handler'
export const GlobalFormHandler = {
    mixins: [MessageHandler],

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
         * Default invalid input message.
         * Must be initiated with sub-module's mixin or manually.
         */
        defaultInvalidInputMessage: {},
        /**
         * Resource url to perform RESTful operation.
         */
        resourceUrl: ''
    }),

    watch: {
        /**
         * Reset invalid input message when record is changed.
         * @param {Object} newRecord newly record from reactivity.
         */
        record(newRecord) {
            this.setInvalidInputMessage(this.defaultInvalidInputMessage);
        }
    },

    methods: {
        /**
         * Set invalid input message.
         * This method to reduce the code repetition.
         * @param {Object} newInvalidInputMessage New invalid input message value to set.
         */
        setInvalidInputMessage(newInvalidInputMessage) {
            this.invalidInputMessage = Object.assign(
                {},
                this.invalidInputMessage,
                newInvalidInputMessage
            );
        },

        /**
         * Submit the form.
         */
        submitForm() {
            this.setInvalidInputMessage(this.defaultInvalidInputMessage);
            if (this.editMode) {

            } else {

            }
        },

        /**
         * Send the POST request to the server.
         * @param {Object} newRecord The new record input by user
         */
        createRecord(newRecord) {
            let vm = this
            vm.$axios
                .$post(vm.$store.getters.apiUrl(vm.resourceUrl), newRecord)
                .then(function (result) {
                    vm.$emit('recordCreated', result);
                })
                .catch(function (result) {
                    vm.extractMessages(result);
                })
        },

        /**
         * Send the PUT request to the server.
         * @param {Object} updatedRecord Record updated from user
         */
        updateRecord(updatedRecord) {
            let vm = this
            vm.$axios
                .$put(vm.$store.getters.apiUrl(vm.resourceUrl), updatedRecord)
                .then(function (result) {
                    vm.$emit('recordUpdated', result);
                })
                .catch(function (result) {
                    vm.extractMessages(result);
                })
        }
    }
}