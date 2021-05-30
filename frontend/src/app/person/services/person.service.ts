import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person, PersonDie } from '../../shared/models/person';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

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

  public addPerson(person: Person) {
    this.http.post(this.url + '/people', person).subscribe(
      (resp: any) => { this.openDialog('Операция выполнена', 'Человек успешно добавлен!')},
      (error: any) => { 
        const message = (error.error.message == 'Internal server error') ? "Человек с таким паспортом уже существует!" : error.error.message;
        this.openDialog('Ошибка', message);
      }
    );
  }

  public addPersonInConstructorDtp(person: Person): any {
    let res
    this.http.post(this.url + '/people', person).subscribe(
      (resp: any) => { res = true },
      (error: any) => { res = false }
    );
    return res;
  }

  public updatePerson(findPassport: string, person: Person): Observable<Person> {
    return this.http.put<Person>(this.url + `/people/passport/${findPassport}`, person)
  }

  public deletePerson(findPassport: string) {
    return this.http.delete(this.url + `/people/passport/${findPassport}`);
  }

  public findPerson(passport: string): Observable<Person> {
    return this.http.get<Person>(this.url + '/people/passport/' + passport)
  }

  public findPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(this.url + '/people/' + id)
  }
  
  public findPersonDie(passport: string): Observable<PersonDie> {
    return this.http.get<PersonDie>(this.url + '/people/die/passport/' + passport)
  }
}
