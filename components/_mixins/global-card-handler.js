export const GlobalCardHandler = {
    props: {
        // The card title.
        title: {
            type: String,
            default: ''
        },

        // Record to be displayed in the card.
        record: {
            type: Object,
            default: function () {
                return {};
            }
        },
    },
}