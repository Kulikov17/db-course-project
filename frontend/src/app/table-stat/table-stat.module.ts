import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableStatRoutingModule } from './table-stat-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { TableStatComponent } from './components/table-stat.component';


@NgModule({
  declarations: [
    TableStatComponent
  ],
  imports: [
    CommonModule,
    TableStatRoutingModule,
    MaterialProxyModule
  ]
})
export class TableStatModule { }
