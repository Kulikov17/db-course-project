import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './components/person/person.component';
import { PersonRoutingModule } from './person-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { PersonAddComponent } from './components/person-add/person-add.component';
import { PersonUpdateComponent } from './components/person-update/person-update.component';


@NgModule({
  declarations: [
    PersonComponent,
    PersonAddComponent,
    PersonUpdateComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    MaterialProxyModule
  ]
})
export class PersonModule { }
