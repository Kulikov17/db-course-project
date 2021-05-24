import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

export interface UpdateUserPassword {
  username: string;
  password: string;
  newPassword: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

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


  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

  public getUser(username: string): Observable<User> {
    return this.http.get<User>(this.url + '/users/' + username);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/users', user);
  }

  public deleteUser(username: string) {
    return this.http.delete(this.url + '/users/' + username);
  }

  public setRole(user: User) {
    return this.http.put<User>(this.url + '/users/setrole', user);
  }

  public resetPasswordUser(username: string) {
    return this.http.put(this.url + '/users/resetpassword/' + username, null);
  }

  public updatePasswordUser(password: string, newPassword: string) {
    const update: UpdateUserPassword = {
      username: localStorage.getItem('username'),
      password: password,
      newPassword: newPassword,
      role: localStorage.getItem('role')
    };

    return this.http.put(this.url + '/users/updatepassword', update);
  }
}
