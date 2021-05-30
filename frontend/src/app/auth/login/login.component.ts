import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;

  public authForm: FormGroup;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      "login": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required])
    });
  }

  public login() {
    this.authService.login(this.authForm.controls['login'].value, this.authForm.controls['password'].value);
  }

}
