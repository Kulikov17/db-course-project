import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { AddDtp, AffectedDTP } from 'src/app/shared/models/addDtp';

export class SetDesc {
  dtpId: number;
  description: string;
}

export class MinMaxYearDtp {
  min: string; 
  max: string;
}

export class CountDataDto {
  mindate: string; 
  maxdate: string;
  categoryid?: number;
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

  public getAllDtp() {
    return this.http.get(this.url + '/dtp');
  }

  public changeDescription(setDesc: SetDesc) {
    return this.http.put(this.url + '/dtp/description/'+setDesc.dtpId, setDesc);
  }

  public getDtpById(id: number) {
    return this.http.get(this.url + '/dtp/'+ id);
  }

  public getCountDtp() {
    return this.http.get(this.url + '/dtp/count/dtp');
  }

  public getCountAffDriversDie() {
    return this.http.get(this.url + '/dtp/count/affdrivers/die');
  }

  public getCountAffDriversHurt() {
    return this.http.get(this.url + '/dtp/count/affdrivers/hurt');
  }

  public getCountAffOthersDie() {
    return this.http.get(this.url + '/dtp/count/affothers/die');
  }

  public getCountAffOthersHurt() {
    return this.http.get(this.url + '/dtp/count/affothers/hurt');
  }

  public getCountDtpDate(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/dtp/date', findCount);
  }

  public getCountAffDriversDieDate(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affdrivers/date/die', findCount);
  }

  public getCountAffDriversHurtDate(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affdrivers/date/hurt',findCount);
  }

  public getCountAffOthersDieDate(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affothers/date/die',findCount);
  }

  public getCountAffOthersHurtDate(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affothers/date/hurt', findCount);
  }

  public getCountDtpDateCategory(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/dtp/dateandcategory', findCount);
  }

  public getCountAffDriversDieDateCategory(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affdrivers/dateandcategory/die',findCount);
  }

  public getCountAffDriversHurtDateCategory(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affdrivers/dateandcategory/hurt', findCount);
  }

  public getCountAffOthersDieDateCategory(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affothers/dateandcategory/die', findCount);
  }

  public getCountAffOthersHurtDateCategory(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affothers/dateandcategory/hurt', findCount);
  }

  public getCountDtpCity() {
    return this.http.get(this.url + '/dtp/count/dtp/city');
  }

  public getCountAffDriversDieCity() {
    return this.http.get(this.url + '/dtp/count/affdrivers/city/die');
  }

  public getCountAffDriversHurtCity() {
    return this.http.get(this.url + '/dtp/count/affdrivers/city/hurt');
  }

  public getCountAffOthersDieCity() {
    return this.http.get(this.url + '/dtp/count/affothers/city/die');
  }

  public getCountAffOthersHurtCity() {
    return this.http.get(this.url + '/dtp/count/affothers/city/hurt');
  }

  public getCountDtpDateCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/dtp/city/date', findCount);
  }

  public getCountAffDriversDieDateCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affdrivers/city/date/die', findCount);
  }

  public getCountAffDriversHurtDateCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affdrivers/city/date/hurt', findCount);
  }

  public getCountAffOthersDieDateCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affothers/city/date/die', findCount);
  }

  public getCountAffOthersHurtDateCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affothers/city/date/hurt', findCount);
  }

  public getCountDtpDateCategoryCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/dtp/city/dateandcategory', findCount);
  }

  public getCountAffDriversDieDateCategoryCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affdrivers/city/dateandcategory/die', findCount);
  }

  public getCountAffDriversHurtDateCategoryCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affdrivers/city/dateandcategory/hurt', findCount);
  }

  public getCountAffOthersDieDateCategoryCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affothers/city/dateandcategory/die', findCount);
  }

  public getCountAffOthersHurtDateCategoryCity(findCount: CountDataDto) {
    return this.http.post(this.url + '/dtp/count/affothers/city/dateandcategory/hurt', findCount);
  }


  public getMinMaxYears() {
    return this.http.get(this.url + '/dtp/date/info');
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