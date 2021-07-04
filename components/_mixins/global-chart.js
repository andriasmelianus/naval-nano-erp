/**
 * Global mixin for chart component.
 * Contains props to set width and height of the chart div, data that holds chart instance, chartSeries and chartData.
 */
export const GlobalChart = {
    props: {
        // Width of the chart div.
        chartDivWidth: {
            type: String,
            default: '100px'
        },

        // Height of the chart div.
        chartDivHeight: {
            type: String,
            default: '100px'
        }
    },

    data: () => ({
        chart: undefined,
        chartSeries: undefined,
        chartData: []
    }),

    computed: {
        chartDivStyle: function () {
            return `width: '${this.width}'; height: '${this.height}';`;
        }
    },
}