import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
    { 
        path: '',
        component: UserTableComponent
    },
    { 
        path: 'users/:userId',
        component: UserInfoComponent 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserInfoRoutingModule { }