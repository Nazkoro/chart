import { Component, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import {Subscription} from "rxjs";
import {BaseService} from "../../service/base.service";

@Component({
  selector: 'app-columncgart',
  templateUrl: './columncgart.component.html',
  styleUrls: ['./columncgart.component.css']
})
export class ColumncgartComponent  {
  options!: AgChartOptions;
  subs: Subscription;

  constructor(private service: BaseService) {
    this.subs = this.service.subjectPost$.subscribe((data) => {
      this.options = {
        autoSize: true,
        data: data,
        title: {
          text: 'Total likes',
          fontSize: 18,
        },
        subtitle: {
          text: 'Likes',
        },
        series: [
          {
            type: 'column',
            xKey: 'username',
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
              text: 'user',
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

}
