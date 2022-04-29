import {Component, OnDestroy} from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import {BaseService} from "../../service/base.service";
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnDestroy {
   options!: AgChartOptions;
   subs: Subscription;
   content: any;


  constructor(private service: BaseService) {
    this.subs = this.service.subjectPost$.subscribe((data) => {
      this.content = data
      this.showChart()
    })


  }
  showChart(){
    this.options = {
      autoSize: true,
      data: this.content,
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
        text: 'statistic user age',
        fontSize: 18,
      },
      subtitle: {
        text: 'age',
      },
      series: [
        {
          type: 'bar',
          xKey: 'username',
          yKey: 'age',
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
            text: 'age',
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
