import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TsComponent } from './components/ts/ts.component';

const routes: Routes = [
    { 
        path: '',
        component: TsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TsRoutingModule { }