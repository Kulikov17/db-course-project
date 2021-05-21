import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ts } from '../../shared/models/ts';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class TsService {

  public url = 'http://localhost:3000';

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  public openDialog(title: string, info: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        info: info
      }});

    dialogRef.afterClosed().subscribe();
  }

  public addTs(ts: Ts) {
    this.http.post(this.url + '/ts', ts).subscribe(
      (resp: any) => { this.openDialog('Операция выполнена', 'ТС успешно добавлено!')},
      (error: any) => { 
          const message = (error.error.message == 'Internal server error') ? "Человека с таким паспортом нет в системе!" : error.error.message;
          this.openDialog('Ошибка', message);
      }
    );;
  }

  public findTS(registerNumber: string): Observable<Ts> {
    return this.http.get<Ts>(this.url + '/ts/registerNumber/' + registerNumber)
  }

  public updateTs(findRegisterNumber: string, ts: Ts): Observable<Ts> {
    return this.http.put<Ts>(this.url + `/ts/registerNumber/${findRegisterNumber}`, ts)
  }

  public deleteTs(findRegisterNumber: string) {
    return this.http.delete(this.url + `/ts/registerNumber/${findRegisterNumber}`);
  }
  
}