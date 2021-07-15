import { GlobalCardHandler } from '~/components/_mixins/global-card-handler'
import { DefaultRecord } from '~/components/company/record'
export const Handler = {
    mixins: [GlobalCardHandler],

    props: {
        record: {
            type: Object,
            default: function () {
                return DefaultRecord;
            }
        }
    },
}