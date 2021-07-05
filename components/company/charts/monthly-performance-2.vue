<template>
  <div id="am4chartsdiv" style="width: 100%; height: 400px"></div>
</template>

<script>
import { am4charts } from "~/components/_mixins/chart/am4charts";
import { SampleData } from "~/components/_mixins/chart/sample-data"; // Remove when using real data.
import { Randomizer } from "~/components/_mixins/randomizer"; // Remove when using real data.
export default {
  mixins: [
    am4charts,
    SampleData, // Remove when using real data.
    Randomizer, // Remove when using real data.
  ],

  data: () => ({
    chartSeries2: undefined, // Additional series if needed.
  }),

  mounted() {
    let vm = this;

    // Generate random values.
    vm.countries.forEach((country) => {
      country.child = vm.randomNumber(100, 1000);
      country.adult = vm.randomNumber(100, 1000);
    });

    // Chart configuration.
    vm.chart = vm.am4core.create("am4chartsdiv", vm.am4charts.XYChart);

    // Chart data configuration.
    vm.chartData = vm.countries;
    vm.chart.data = vm.chartData;

    // Chart category axis.
    vm.chartCategoryAxis = vm.chart.xAxes.push(new vm.am4charts.CategoryAxis());
    vm.chartCategoryAxis.dataFields.category = "country";
    vm.chartCategoryAxis.title.text = "Countries";
    vm.chartCategoryAxis.renderer.grid.template.location = 0;
    vm.chartCategoryAxis.renderer.minGridDistance = 20;
    vm.chartCategoryAxis.renderer.labels.template.rotation = 270; // Rotate the label on X axis.
    vm.chartCategoryAxis.renderer.minHeight = 110; // Give minimum height of label region.
    // Chart value axis.
    vm.chartValueAxis = vm.chart.yAxes.push(new vm.am4charts.ValueAxis());
    vm.chartValueAxis.title.text = "Population";

    // Chart series 1 configuration.
    vm.chartSeries = vm.chart.series.push(new vm.am4charts.ColumnSeries());
    vm.chartSeries.dataFields.categoryX = "country";
    vm.chartSeries.dataFields.valueY = "child";
    vm.chartSeries.name = "Child";
    vm.chartSeries.tooltipText = "{name}: [bold]{valueY}[/]";
    vm.chartSeries.stacked = true;
    // Chart series 2 configuration.
    vm.chartSeries2 = vm.chart.series.push(new vm.am4charts.ColumnSeries());
    vm.chartSeries2.dataFields.categoryX = "country";
    vm.chartSeries2.dataFields.valueY = "adult";
    vm.chartSeries2.name = "Adult";
    vm.chartSeries2.stacked = true;

    // Add cursor.
    vm.chart.cursor = new vm.am4charts.XYCursor();

    // Chart legend configuration.
    // vm.chart.legend = new vm.am4charts.Legend();
    // vm.chart.legend.position = "left";
  },
};
</script>
