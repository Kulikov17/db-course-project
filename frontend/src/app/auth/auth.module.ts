import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { NonAuthGuard } from './non-auth.guard';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialProxyModule
  ],
  exports: [
    LoginComponent,
    ProfileComponent
  ],
  providers: [AuthGuard, NonAuthGuard]
})
export class AuthModule { }
