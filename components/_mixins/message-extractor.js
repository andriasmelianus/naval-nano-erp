/**
 * Extract message sent from API.
 */
export const MessageExtractor = {
    data: () => ({
        messageInfoJsonIndex: 'info_message',
        messageSuccessJsonIndex: 'success_message',
        messageWarningJsonIndex: 'warning_message',
        messageErrorJsonIndex: 'error_message',
    }),

    methods: {
        /**
         * Extract information message from API.
         * @param {array} result Result returned from API.
         * @returns string
         */
        messageInfoExtract(result) {
            return extractFromAxiosError(result)[this.messageInfoJsonIndex];
        },

        /**
         * Extract success message from API.
         * @param {array} result Result returned from API.
         * @returns string
         */
        messageSuccessExtract(result) {
            return extractFromAxiosError(result)[this.messageSuccessJsonIndex];
        },

        /**
         * Extract warning message from API.
         * @param {array} result Result returned from API.
         * @returns string
         */
        messageWarningExtract(result) {
            return extractFromAxiosError(result)[this.messageWarningJsonIndex];
        },

        /**
         * Extract error message from API.
         * @param {array} result Result returned from API.
         * @returns string
         */
        messageErrorExtract(result) {
            return extractFromAxiosError(result)[this.messageErrorJsonIndex];
        },
    }
}

/**
 * Extract object if it returned from Axios's error state.
 * @param {*} result Error object returned from Axios.
 * @returns Object
 */
function extractFromAxiosError(result) {
    if (result.hasOwnProperty('response')) {
        if (result.response.hasOwnProperty('data')) {
            return result.response.data;
        } else {
            return result;
        }
    } else {
        return result;
    }
}