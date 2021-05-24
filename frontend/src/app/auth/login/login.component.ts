import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;
  public loginControl : FormControl;
  public passwordControl : FormControl;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginControl = new FormControl('');
    this.passwordControl = new FormControl('');
  }

  public login() {
    this.authService.login(this.loginControl.value, this.passwordControl.value);
  }

}
