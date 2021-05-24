import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoRoutingModule } from './user-info-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [UserTableComponent, UserInfoComponent],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    MaterialProxyModule
  ]
})
export class UserInfoModule { }
