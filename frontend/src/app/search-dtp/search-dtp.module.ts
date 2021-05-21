import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDtpComponent } from './components/search-dtp/search-dtp.component';
import { SearchDtpRoutingModule } from './search-dtp-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { DtpInfoComponent } from './components/dtp-info/dtp-info.component';

@NgModule({
  declarations: [
    SearchDtpComponent,
    DtpInfoComponent
  ],
  imports: [
    CommonModule,
    SearchDtpRoutingModule,
    MaterialProxyModule
  ]
})
export class SearchDtpModule { }
