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
            return extractMessage(result, this.messageInfoJsonIndex);
        },

        /**
         * Extract success message from API.
         * @param {array} result Result returned from API.
         * @returns string
         */
        messageSuccessExtract(result) {
            return extractMessage(result, this.messageSuccessJsonIndex);
        },

        /**
         * Extract warning message from API.
         * @param {array} result Result returned from API.
         * @returns string
         */
        messageWarningExtract(result) {
            return extractMessage(result, this.messageWarningJsonIndex);
        },

        /**
         * Extract error message from API.
         * @param {array} result Result returned from API.
         * @returns string
         */
        messageErrorExtract(result) {
            return extractMessage(result, this.messageErrorJsonIndex);
        },
    }
}

/**
 * Extract object if it returned from Axios's error state.
 * @param {*} result Error object returned from Axios.
 * @returns Object
 */
function extractApiMessage(result) {
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

/**
 * Extract the real message whether from object or array or plain text.
 * @param {*} result result returned from API server.
 * @param {String} jsonIndex JSON index to be extracted.
 * @returns String
 */
function extractMessageFromMixed(result, jsonIndex) {
    let apiMessage = extractApiMessage(result);
    if (typeof apiMessage == 'object' || typeof apiMessage == 'array') {
        return apiMessage[jsonIndex];
    } else {
        return result;
    }
}

/**
 * Extract message returned from extractMessageFromMixed.
 * If it's empty, extract from alternative JSON index: message.
 * @param {*} result result returned from API server.
 * @param {*} jsonIndex Json index to be extracted.
 * @returns String
 */
function extractMessage(result, jsonIndex) {
    let extractedMessage = extractMessageFromMixed(result, jsonIndex);
    if (extractedMessage == '' || extractedMessage == null || extractedMessage == undefined) {
        extractedMessage = extractMessageFromMixed(result, 'message');
    }

    return extractedMessage;
}