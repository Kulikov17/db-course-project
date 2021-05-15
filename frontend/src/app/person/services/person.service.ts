import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../../shared/models/person';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  public addPerson(person: Person) {
    this.http.post(this.url + '/people', person).subscribe(
      (resp: any) => { this.openDialog('Операция выполнена', 'Человек успешно добавлен!')},
      (error: any) => { this.openDialog('Ошибка', 'Человек с таким паспортом уже существует!')}
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

  public findPerson(passport: string): Observable<Person> {
    return this.http.get<Person>(this.url + '/people/passport/' + passport)
  }
  
}
