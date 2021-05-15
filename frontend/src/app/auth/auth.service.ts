import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
 
export class AuthService {
 
  url = 'http://localhost:3000';
  signInAuth: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.post(this.url + '/auth', {username: email, password: password})
    .subscribe((resp: any) => {
      this.setSession(resp);
      this.router.navigate(['profile']);
      this.signInAuth = true;
    },
      (error: any) => { this.signInAuth = false;}
    );
  }
 
  private setSession(resp) {
    localStorage.setItem('token', resp.access_token);
  }   

  logout() {
    localStorage.removeItem('token');
    this.signInAuth = false;
  }
 
  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

}