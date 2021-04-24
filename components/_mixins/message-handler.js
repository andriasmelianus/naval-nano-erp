export const MessageHandler = {
    data: () => ({
        infoMessage: '',
        successMessage: '',
        warningMessage: '',
        errorMessage: '',
        defaultInvalidInputMessage: {},
        invalidInputMessage: {},

        successJsonIndex: 'success',
        infoMessageJsonIndex: 'info_message',
        successMessageJsonIndex: 'success_message',
        warningMessageJsonIndex: 'warning_message',
        errorMessageJsonIndex: 'error_message',
        invalidInputMessageJsonIndex: 'invalid_input_message',
    }),
    methods: {
        /**
         * Clear the messages and reset to the default state.
         */
        clearMessages() {
            let vm = this

            vm.infoMessage = '';
            vm.successMessage = '';
            vm.warningMessage = '';
            vm.errorMessage = '';

            vm.invalidInputMessage = Object.assign({}, vm.defaultInvalidInputMessage);
        },

        /**
         * Sets the ready-to-display messages to corresponding data.
         * @param {array} response response returned by the API
         */
        extractMessages(response) {
            let vm = this

            vm.infoMessage = response.response.data[vm.infoMessageJsonIndex];
            vm.successMessage = response.response.data[vm.successMessageJsonIndex];
            vm.warningMessage = response.response.data[vm.warningMessageJsonIndex];
            vm.errorMessage = response.response.data[vm.errorMessageJsonIndex];

            // Object message for input need to be set with Object.assign().
            vm.invalidInputMessage = Object.assign({}, vm.invalidInputMessage, response.response.data[vm.invalidInputMessageJsonIndex]);
        },

        generateNotification(response) {
            let vm = this,
                objectNotification = {};

            if (response[vm.successJsonIndex]) {
                objectNotification = Object.assign({}, {
                    color: 'success',
                    message: response[vm.successMessageJsonIndex]
                });
            } else {
                objectNotification = Object.assign({}, {
                    color: 'error',
                    message: response[vm.errorMessageJsonIndex]
                });
            }

            return objectNotification;
        }
    }
}