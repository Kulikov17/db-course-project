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

  url = 'http://localhost:3000';

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  public addTs(ts: Ts) {
    this.http.post(this.url + '/ts', ts).subscribe(
      (resp: any) => { this.openDialog('Операция выполнена', 'ТС успешно добавлено!')},
      (error: any) => { this.openDialog('Ошибка', 'ТС с таким регистрационным номером уже существует!')}
    );;
  }

  
  public openDialog(title: string, info: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        info: info
      }});

    dialogRef.afterClosed().subscribe();
  }

  public findTS(registerNumber: string): Observable<Ts> {
    return this.http.get<Ts>(this.url + '/ts/registerNumber/' + registerNumber)
  }
  
}