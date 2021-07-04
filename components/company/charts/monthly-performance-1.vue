<template>
  <div id="amcharts4div" :style="chartDivStyle"></div>
</template>

<script>
import { amcharts4 } from "~/components/_mixins/amcharts4";
export default {
  mixins: [amcharts4],

  mounted() {
    let vm = this;

    // Chart configuration
    vm.chart = vm.am4core.create("amcharts4div", vm.am4charts.PieChart);
    vm.chart.innerRadius = vm.am4core.percent(50);
    // Chart series configuration
    vm.chartSeries = vm.chart.series.push(new vm.am4charts.PieSeries());
    vm.chartSeries.dataFields.value = "value";
    vm.chartSeries.dataFields.category = "category";
    vm.chartSeries.labels.template.text = "{category}: {value}";
    // Chart legend configuration
    vm.chart.legend = new vm.am4charts.Legend();
    vm.chart.legend.position = "left";

    // Chart data configuration
    vm.chartData = [
      {
        category: "Consumer Goods",
        value: 89,
      },
      {
        category: "Basic Components",
        value: 29,
      },
      {
        category: "Spare Parts",
        value: 64,
      },
    ];
    vm.chart.data = vm.chartData;
  },
};
</script>
