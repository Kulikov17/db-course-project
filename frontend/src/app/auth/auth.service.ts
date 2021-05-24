import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
 
export class AuthService {
 
  public url = 'http://localhost:3000';
  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) { }

  public openDialog(title: string, info: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        info: info
      }});

    dialogRef.afterClosed().subscribe();
  }
  
  login(email: string, password: string) {
    this.http.post(this.url + '/auth', {username: email, password: password})
    .subscribe((resp: any) => {
      this.setSession(resp);
      this.router.navigate(['profile']);
    },
    (error: any) => {
      this.openDialog('Ошибка', 'Неверный логин или пароль!');
    });
  }
 
  private setSession(resp) {
    localStorage.setItem('token', resp.access_token);
    localStorage.setItem('username', resp.username);
    localStorage.setItem('role', resp.role);
  }   

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
 
  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public getUserName() {
    return localStorage.getItem('username');
  }

  public isLoggedAdmin(): boolean {
    return localStorage.getItem('role') == 'администратор';
  }

  public isLoggedUser(username: string): boolean {
    return localStorage.getItem('username') == username;
  }
}