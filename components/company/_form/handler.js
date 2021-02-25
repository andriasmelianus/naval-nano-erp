import { GlobalFormHandler } from '~/components/_mixins/global-form-handler'
import { defaultRecord, defaultInvalidInputMessage } from './record'
export const handler = {
    mixins: [GlobalFormHandler],

    props: {
        record: {
            type: Object,
            default: function () {
                return defaultRecord;
            }
        }
    },

    data: () => ({
        defaultInvalidInputMessage: defaultInvalidInputMessage,

        resourceUrl: '/company'
    })
}