export const MessageHandler = {
    data: () => ({
        infoMessage: '',
        warningMessage: '',
        errorMessage: '',
        defaultInvalidInputMessage: {},
        invalidInputMessage: {},

        infoMessageJsonIndex: 'info_message',
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
            vm.warningMessage = response.response.data[vm.warningMessageJsonIndex];
            vm.errorMessage = response.response.data[vm.errorMessageJsonIndex];

            // Object message for input need to be set with Object.assign().
            vm.invalidInputMessage = Object.assign({}, vm.invalidInputMessage, response.response.data[vm.invalidInputMessageJsonIndex]);
        },
    }
}