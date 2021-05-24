import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { AddDtp, AffectedDTP } from 'src/app/shared/models/addDtp';
import { Dtp } from 'src/app/shared/models/dtp';

export class SetDesc {
  dtpId: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DtpService {

  public url = 'http://localhost:3000';


  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  public addDtp(newDtp: AddDtp) {
    return this.http.post(this.url + '/dtp', newDtp)
  }

  public deleteDtp(id: number) {
    return this.http.delete(this.url + '/dtp/'+id)
  }

  public addAffectedDrivers(newAff: AffectedDTP[]) {
    return this.http.post(this.url + '/dtp/affecteddrivers', newAff);
  }

  public addAffectedOthers(newAff: AffectedDTP[]) {
    return this.http.post(this.url + '/dtp/affectedothers', newAff);
  }

  public getAllAffectedDrivers() {
    return this.http.get(this.url + '/dtp/affecteddrivers');
  }

  public getAllAffectedOthers() {
    return this.http.get(this.url + '/dtp/affectedothers');
  }

  public getAllDtp() {
    return this.http.get(this.url + '/dtp');
  }

  public changeDescription(setDesc: SetDesc) {
    return this.http.put(this.url + '/dtp/description/'+setDesc.dtpId, setDesc);
  }

  public getDtpById(id: number) {
    return this.http.get(this.url + '/dtp/'+ id);
  }

  public openDialog(title: string, info: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        info: info
      }});

    dialogRef.afterClosed().subscribe();
  }  
}