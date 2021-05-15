import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YandexMapModule } from '../yandex-map/yandex-map.module';
import { MapStatRoutingModule } from './map-stat-routing.module';
import { MapStatComponent } from './components/map-stat/map-stat.component';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';

@NgModule({
  declarations: [MapStatComponent],
  imports: [
    CommonModule,
    YandexMapModule,
    MaterialProxyModule,
    MapStatRoutingModule
  ]
})
export class MapStatModule { }
