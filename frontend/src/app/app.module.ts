import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialProxyModule } from './material-proxy/material-proxy.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MapStatModule } from './map-stat/map-stat.module';
import { CreateDtpModule } from './create-dtp/create-dtp.module';
import { PersonModule } from './person/person.module';
import { TsModule } from './ts/ts.module';
import { UserInfoModule } from './user-info/user-info.module';
import { SearchDtpModule } from './search-dtp/search-dtp.module';
import { TableStatModule } from './table-stat/table-stat.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialProxyModule,
    FormsModule, 
    ReactiveFormsModule,
    AuthModule,
    MapStatModule,
    SearchDtpModule,
    TableStatModule,
    CreateDtpModule,
    PersonModule,
    TsModule,
    UserInfoModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
