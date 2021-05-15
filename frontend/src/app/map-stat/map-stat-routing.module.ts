import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapStatComponent } from './components/map-stat/map-stat.component';

const routes: Routes = [
    { 
        path: '',
        component: MapStatComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapStatRoutingModule { }