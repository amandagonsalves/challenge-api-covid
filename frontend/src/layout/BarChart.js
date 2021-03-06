import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import { getValues } from './getData';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_material);

export default props => {
  const chart = useRef(null);
  const list = props.data;

  useLayoutEffect(() => {
    var x = am4core.create(props.id, am4charts.XYChart);

    x.data = getValues(list, props.field, props.valueY, am4core);

    var categoryAxis = x.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "region";
    categoryAxis.title.text = "Region";

    var valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = props.titleText;

    var series = x.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = props.valueY;
    series.dataFields.categoryX = "region";
    series.name = props.seriesName;
    series.columns.template.fill = am4core.color(props.color);
    series.stroke = am4core.color("#FFF");

    let colorSet = new am4core.ColorSet();
    
    x.legend = new am4charts.Legend();
    x.cursor = new am4charts.XYCursor();

    var scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;
    x.scrollbarX.thumb.background.fill = am4core.color("#FFF");
    scrollbarX.scrollbarChart.seriesContainer.hide();
    x.scrollbarX.minHeight = 20;
    x.scrollbarX.marginTop = 25;
    x.scrollbarX.marginBottom = 25;

    let scrollAxis = x.scrollbarX.scrollbarChart.xAxes.getIndex(0);
    scrollAxis.renderer.labels.template.disabled = true;
    scrollAxis.renderer.grid.template.disabled = true;

    x.paddingRight = 50;
    x.fontSize = 12;
    x.maxWidth = 500;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [list, props.id]);


  return (
    <div id={props.id}></div>
  );
}