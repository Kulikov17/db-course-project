import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YandexMapComponent } from './components/yandex-map/yandex-map.component';

@NgModule({
  declarations: [YandexMapComponent],
  imports: [
    CommonModule,
  ],
  exports: [YandexMapComponent]
})
export class YandexMapModule { }
