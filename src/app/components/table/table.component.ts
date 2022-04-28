import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AgChartThemeOverrides,
  ColDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from 'ag-grid-community';
// import 'ag-grid-enterprise';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  public columnDefs: ColDef[] = [
    // different ways to define 'categories'
    { field: 'athlete', width: 150, chartDataType: 'category' },
    { field: 'age', chartDataType: 'category', sort: 'asc' },
    { field: 'sport' },
    // excludes year from charts
    { field: 'year', chartDataType: 'excluded' },
    // different ways to define 'series'
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze' }, // inferred as series by grid
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public popupParent: HTMLElement = document.body;
  public chartThemeOverrides: AgChartThemeOverrides = {
    common: {
      title: {
        enabled: true,
        text: 'Medals by Age',
      },
      legend: {
        position: 'bottom',
      },
    },
    column: {
      axes: {
        category: {
          label: {
            rotation: 0,
          },
        },
      },
    },
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['age', 'gold', 'silver', 'bronze'],
      },
      chartType: 'groupedColumn',
      chartContainer: document.querySelector('#myChart') as any,
      aggFunc: 'sum',
    };
    params.api.createRangeChart(createRangeChartParams);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/wide-spread-of-sports.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
