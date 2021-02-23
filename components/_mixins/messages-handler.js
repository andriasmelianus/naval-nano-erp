export const messagesHandler = {
    data: () => ({
        infoMessage: '',
        warningMessage: '',
        errorMessage: '',
        invalidInputMessage: undefined,

        infoMessageJsonIndex: 'info_message',
        warningMessageJsonIndex: 'warning_message',
        errorMessageJsonIndex: 'error_message',
        invalidInputMessageJsonIndex: 'invalid_input_message',
    }),
    methods: {
        /**
         * Return the ready-to-display messages.
         * @param {array} response response returned by the API
         */
        extractMessages(response) {
            let vm = this

            // return response.response.data[messageType]
            vm.infoMessage = response.response.data[vm.infoMessageJsonIndex];
            vm.warningMessage = response.response.data[vm.warningMessageJsonIndex];
            vm.errorMessage = response.response.data[vm.errorMessageJsonIndex];

            vm.invalidInputMessage = response.response.data[vm.invalidInputMessageJsonIndex];
        },
    }
}