import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DtpService, SetDesc } from '../../../dtp/services/dtp.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';
import { PersonService } from 'src/app/person/services/person.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-dtp-info',
  templateUrl: './dtp-info.component.html',
  styleUrls: ['./dtp-info.component.css']
})
export class DtpInfoComponent  {

    id: number;
    username: string;
    description: FormControl;
    oldDescription: string;

    isChanged:boolean = false;

    dateDtp: string;
    timeDtp: string;
    regionDtp: string;
    cityDtp: string;
    typeDtp: any;
    affecteddrivers: any;
    affectedothers: any;

    public isLoadData = false;
     
    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    
    constructor( public dialog: MatDialog, private dtpService: DtpService,
       private router: Router, private routeActive: ActivatedRoute, private personService: PersonService){
        this.querySubscription = routeActive.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['dtpId'];
                this.isLoadData = true;
                this.dtpService.getDtpById(this.id).subscribe((resp: any) => {
                  this.dateDtp = resp.dateDtp;
                  this.timeDtp = resp.timeDtp;
                  this.regionDtp = resp.regionDtp;
                  this.cityDtp = resp.cityDtp;
                  this.typeDtp = resp.dt;
                  this.oldDescription = resp.descriptionDtp;
                  this.description = new FormControl('');
                  this.description.setValue(resp.descriptionDtp);
                  this.description.disable();
                  this.affecteddrivers = resp.affecteddrivers;
                  this.affectedothers = resp.affectedothers;
                  this.isLoadData = false;
                })
            }
        );
    }

    beginChanges() {
      this.isChanged = true;
      this.description.enable();
    }

    cancelChanges() {
      this.isChanged = false;
      this.description.setValue(this.oldDescription);
      this.description.disable();
    }

    saveChanges() {
      const newDesc: SetDesc = {
        dtpId: this.id,
        description: this.description.value
      };
  
      this.dtpService.changeDescription(newDesc).subscribe((resp: any) => {
        this.oldDescription = this.description.value;
        this.cancelChanges();
        this.openAfterUpdateDescriptionDialog('Операция выполнена', 'Описание ДТП изменено!');
      }) 
    }

    openAfterDeleteDialog(title: string, info: string) {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: {
          title: title,
          info: info
        }});
  
      dialogRef.afterClosed().subscribe(()=>{
        this.router.navigateByUrl('/dtp-search');
    });
    }

    openAfterUpdateDescriptionDialog(title: string, info: string) {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: {
          title: title,
          info: info
        }});
  
      dialogRef.afterClosed().subscribe();
    }

    deleteDtp() {
      this.dtpService.deleteDtp(this.id).subscribe((resp: any) => {
        this.openAfterDeleteDialog('Операция выполнена', 'ДТП было удалено!');
        this.isChanged = false;
      }) 
    }  
}


