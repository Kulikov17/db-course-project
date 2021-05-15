import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDtpComponent } from './components/create-dtp.component';

const routes: Routes = [
    {
        path: '',
        component: CreateDtpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateDtpRoutingModule { }