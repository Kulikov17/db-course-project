import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './components/person/person.component';
import { PersonRoutingModule } from './person-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { PersonUpdateComponent } from './components/person-update/person-update.component';


@NgModule({
  declarations: [
    PersonComponent,
    PersonInfoComponent,
    PersonUpdateComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    MaterialProxyModule
  ]
})
export class PersonModule { }
