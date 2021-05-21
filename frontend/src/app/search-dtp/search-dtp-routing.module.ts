import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchDtpComponent } from './components/search-dtp/search-dtp.component';
import { DtpInfoComponent } from './components/dtp-info/dtp-info.component';

const routes: Routes = [
    { 
        path: '',
        component: SearchDtpComponent
    },
    { 
        path: 'dtp-search/:dtpId',
        component: DtpInfoComponent 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchDtpRoutingModule { }