import { GlobalChart } from "~/components/_mixins/global-chart";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4chartsChartingComponents from "@amcharts/amcharts4/charts";
export const am4charts = {
  mixins: [GlobalChart],

  data: () => ({
    am4core: am4core,
    am4charts: am4chartsChartingComponents
  })
};
