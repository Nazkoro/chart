import { Component, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-columncgart',
  templateUrl: './columncgart.component.html',
  styleUrls: ['./columncgart.component.css']
})
export class ColumncgartComponent implements OnInit {
 options: AgChartOptions;

  constructor() {
    this.options = {
      autoSize: true,
      data: this.getData(),
      title: {
        text: 'Total Visitors to Museums and Galleries',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Department for Digital, Culture, Media & Sport',
      },
      series: [
        {
          type: 'column',
          xKey: 'year',
          yKey: 'visitors',
          fill: '#0084e7',
          strokeWidth: 0,
          shadow: {
            enabled: true,
            xOffset: 3,
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            enabled: true,
            text: 'Year',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            enabled: true,
            text: 'Total visitors',
          },
          label: {
            formatter: function (params) {
              return params.value / 1000000 + 'M';
            },
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  ngOnInit() {}
  getData() {
    return [
      { year: '2009', visitors: 40973087 },
      { year: '2010', visitors: 42998338 },
      { year: '2011', visitors: 44934839 },
      { year: '2012', visitors: 46636720 },
      { year: '2013', visitors: 48772922 },
      { year: '2014', visitors: 50800193 },
      { year: '2015', visitors: 48023342 },
      { year: '2016', visitors: 47271912 },
      { year: '2017', visitors: 47155093 },
      { year: '2018', visitors: 49441678 },
      { year: '2019', visitors: 50368190 },
    ];
  }
}
