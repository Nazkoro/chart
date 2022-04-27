import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import {BaseService} from "../../service/base.service";
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit , OnDestroy , AfterViewInit{
   options!: AgChartOptions;
   subs: Subscription;
   content: any;


  constructor(private service: BaseService) {
    this.subs = this.service.subject$.subscribe((data) => {
      this.content = data
      console.log("line component", data)
      this.showChart()
    })


  }
  showChart(){
    console.log("print")
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
        text: 'Gross Weekly Earnings by Occupation (Q4 2019)',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Office for National Statistics',
      },
      series: [
        {
          type: 'bar',
          xKey: 'username',
          yKey: 'year',
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
            text: 'year of birth',
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };

  }


  ngOnInit() {}

  ngAfterViewInit(){
    console.log("READY VIEW LINE COMPONENT")
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

   getData(){
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
