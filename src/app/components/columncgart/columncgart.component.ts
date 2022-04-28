import { Component, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import {Subscription} from "rxjs";
import {BaseService} from "../../service/base.service";

@Component({
  selector: 'app-columncgart',
  templateUrl: './columncgart.component.html',
  styleUrls: ['./columncgart.component.css']
})
export class ColumncgartComponent implements OnInit {
 options!: AgChartOptions;
  subs: Subscription;

  constructor(private service: BaseService) {
    this.subs = this.service.subjectPost$.subscribe((data) => {
      this.options = {
        autoSize: true,
        data: data,
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
            xKey: 'desc',
            yKey: 'likes',
            fill: 'green',
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
              text: 'description',
            },
          },
          {
            type: 'number',
            position: 'left',
            title: {
              enabled: true,
              text: 'Total likes',
            },
          },
        ],
        legend: {
          enabled: false,
        },
      };

    })
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
