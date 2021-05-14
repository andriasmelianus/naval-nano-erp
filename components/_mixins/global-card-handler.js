export const GlobalCardHandler = {
    props: {
        // Record to be displayed in the card.
        record: {
            type: Object,
            default: function () {
                return {};
            }
        },
    },
}