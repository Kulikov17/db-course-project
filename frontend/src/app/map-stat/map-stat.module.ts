import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapStatRoutingModule } from './map-stat-routing.module';
import { MapStatComponent } from './components/map-stat/map-stat.component';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';

@NgModule({
  declarations: [MapStatComponent],
  imports: [
    CommonModule,
    MaterialProxyModule,
    MapStatRoutingModule
  ]
})
export class MapStatModule { }
