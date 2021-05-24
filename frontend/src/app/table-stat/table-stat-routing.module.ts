import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableStatComponent } from './components/table-stat.component';

const routes: Routes = [
    { 
        path: 'tablestat',
        component: TableStatComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TableStatRoutingModule { }