import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user-info/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public hide = true;
  public passwordForm: FormGroup;
  constructor(public authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      "password": new FormControl("", [Validators.required]),
      "newPassword": new FormControl("", [Validators.required])
    });
  }

  updatePassword(): void {
    this.userService.updatePasswordUser(this.passwordForm.controls['password'].value,
     this.passwordForm.controls['newPassword'].value).subscribe( (resp: any) => { 
      this.userService.openDialog('Операция выполнена', 'Пароль успешно обновлен!');
      this.logout();
    },
    (error: any) => { 
      this.userService.openDialog('Ошибка', 'Неверный пароль');
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['profile/sign-in']);
  }
}
