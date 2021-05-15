import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { CreateDtpComponent } from '../create-dtp/components/create-dtp.component';
import { CreateDtpRoutingModule } from './create-dtp-routing.module';
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { AddOthersComponent } from './components/add-others/add-others.component';


@NgModule({
  declarations: [
    CreateDtpComponent,
    AddDriverComponent,
    AddOthersComponent,
  ],
  imports: [
    CommonModule,
    MaterialProxyModule,
    CreateDtpRoutingModule,
    NgxDadataModule
  ],
  exports: [
    CreateDtpComponent
  ],
})
export class CreateDtpModule { }
