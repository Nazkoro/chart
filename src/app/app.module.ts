import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import {HttpClientModule} from "@angular/common/http";
import { LinechartComponent } from './components/linechart/linechart.component';
import { ColumncgartComponent } from './components/columncgart/columncgart.component';
import { DiagramchartComponent } from './components/diagramchart/diagramchart.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    LinechartComponent,
    ColumncgartComponent,
    DiagramchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    AgChartsAngularModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
