import { Component, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
   options: AgChartOptions;

  constructor() {
    this.options = {
      autoSize: true,
      data: this.getData(),
      theme: {
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
            },
          },
        },
      },
      title: {
        text: 'Gross Weekly Earnings by Occupation (Q4 2019)',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Office for National Statistics',
      },
      series: [
        {
          type: 'bar',
          xKey: 'type',
          yKey: 'earnings',
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'left',
        },
        {
          type: 'number',
          position: 'bottom',
          title: {
            enabled: true,
            text: '£/week',
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
      { type: 'Managers, directors & senior officials', earnings: 954 },
      { type: 'Professional occupations', earnings: 844 },
      { type: 'Associate professional & technical', earnings: 699 },
      { type: 'Skilled trades', earnings: 503 },
      { type: 'Process, plant & machine operatives', earnings: 501 },
      { type: 'Administrative & secretarial', earnings: 457 },
      { type: 'Sales & customer services', earnings: 407 },
      { type: 'Elementary occupations', earnings: 380 },
      { type: 'Caring, leisure & other services', earnings: 358 },
    ];
  }

}
