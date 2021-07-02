import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
export const amcharts4 = {
    props: {
        width: {
            type: String,
            default: '100px'
        },
        height: {
            type: String,
            default: '100px'
        }
    },


    data: () => ({
        am4core: am4core,
        am4charts: am4charts,

        chart: undefined,
        chartSeries: undefined,

        data: []
    }),

    computed: {
        divStyle: function () {
            return `width: '${this.width}'; height: '${this.height}';`;
        }
    },
}