import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { AddDtp } from 'src/app/shared/models/addDtp';
import { Dtp } from 'src/app/shared/models/dtp';

@Injectable({
  providedIn: 'root'
})
export class DtpService {

  public url = 'http://localhost:3000';

  public dtp;

  constructor(private http: HttpClient, public dialog: MatDialog) {
      this.getAllDtp();
  }

  public addDtp(newDtp: AddDtp) {
    this.http.post(this.url + '/dtp', newDtp).subscribe(
      (resp: any) => { this.openDialog('Операция выполнена', ' ДТП успешно добавлено!')},
      (error: any) => { this.openDialog('Ошибка', 'ДТП не добавлено!')}
    );;
  }


  public getAllDtp(): Observable<Dtp> {
    return this.http.get<Dtp>(this.url + '/dtp');
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