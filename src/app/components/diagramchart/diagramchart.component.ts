import {Component, OnDestroy} from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgChartOptions } from 'ag-charts-community';
import {BaseService} from "../../service/base.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-diagramchart',
  templateUrl: './diagramchart.component.html',
  styleUrls: ['./diagramchart.component.css']
})
export class DiagramchartComponent implements OnDestroy{
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
      title: {
        text: 'amount users posts',
        fontSize: 18,
      },
      subtitle: {
        text: 'Posts Statistics',
      },
      series: [
        {
          data: this.content,
          type: 'pie',
          labelKey: 'username',
          angleKey: 'Posts',
          label: {
            minAngle: 0,
          },
          callout: {
            strokeWidth: 2,
          },
          fills: [
            '#febe76',
            '#ff7979',
            '#badc58',
            '#f9ca23',
            '#f0932b',
            '#eb4c4b',
            '#6ab04c',
            '#7ed6df',
          ],
          strokes: [
            '#b28553',
            '#b35555',
            '#829a3e',
            '#ae8d19',
            '#a8671e',
            '#a43535',
            '#4a7b35',
            '#58969c',
          ],
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
