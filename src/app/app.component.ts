import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public options: any;
  data = [
    {
      beverage: 'Coffee',
      Q1: 450,
      Q2: 560,
      Q3: 600,
      Q4: 700,
    },
    {
      beverage: 'Tea',
      Q1: 270,
      Q2: 380,
      Q3: 450,
      Q4: 520,
    },
    {
      beverage: 'Milk',
      Q1: 180,
      Q2: 170,
      Q3: 190,
      Q4: 200,
    },
  ];

  constructor() {
    this.options = {
      data: this.data,
      series: [
        { type: 'column', xKey: 'beverage', yKey: 'Q1', stacked: true },
        { type: 'column', xKey: 'beverage', yKey: 'Q2', stacked: true },
        { type: 'column', xKey: 'beverage', yKey: 'Q3', stacked: true },
        { type: 'column', xKey: 'beverage', yKey: 'Q4', stacked: true },
      ],
      legend: {
        position: 'bottom',
      },
  };

  }
}
