import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dtp',
    loadChildren: () => import('./map-stat/map-stat.module').then(m => m.MapStatModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dtp-create',
    loadChildren: () => import('./create-dtp/create-dtp.module').then(m => m.CreateDtpModule),
  },
  {
    path: 'people',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
  },
  {
    path: 'ts',
    loadChildren: () => import('./ts/ts.module').then(m => m.TsModule),
  },
  {
    path: 'dtp-search',
    loadChildren: () => import('./search-dtp/search-dtp.module').then(m => m.SearchDtpModule),
  },
  {
    path: 'table-stat',
    loadChildren: () => import('./table-stat/table-stat.module').then(m => m.TableStatModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./user-info/user-info.module').then(m => m.UserInfoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
