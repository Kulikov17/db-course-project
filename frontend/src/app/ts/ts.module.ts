import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsRoutingModule } from './ts-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { TsComponent } from './components/ts/ts.component';
import { TsUpdateComponent } from './components/ts-update/ts-update.component';
import { TsAddComponent } from './components/ts-add/ts-add.component';

@NgModule({
  declarations: [
    TsComponent,
    TsUpdateComponent,
    TsAddComponent
  ],
  imports: [
    CommonModule,
    TsRoutingModule,
    MaterialProxyModule
  ]
})
export class TsModule { }
