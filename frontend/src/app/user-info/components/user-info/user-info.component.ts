import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../user.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent  {

    id: number;
    username: string;
    role: FormControl;

    isChanged:boolean = false;
     
    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    
    constructor( public dialog: MatDialog, private auth: AuthService, private router: Router, private routeActive: ActivatedRoute, private userService: UserService){
        this.querySubscription = routeActive.queryParams.subscribe(
            (queryParam: any) => {
                this.userService.getUser(queryParam['username']).subscribe((resp: User) => {
                  console.log(resp);
                  this.username = resp.username;
                  this.role = new FormControl();
                  this.role.setValue(resp.role);
                  this.role.disable();
                })
            }
        );
    }

    beginChanges() {
      this.isChanged = true;
      this.role.enable();
    }

    cancelChanges() {
      this.isChanged = false;
      this.role.disable();
    }

    saveChanges() {
      const user: User = {
        username: this.username,
        role: this.role.value
      };
  
      this.userService.setRole(user).subscribe((resp: any) => {
        this.openAfterSetRoleDialog('Операция выполнена', 'Роль пользователя изменена!');
        this.isChanged = false;
      }) 
    }

    openAfterDeleteDialog(title: string, info: string) {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: {
          title: title,
          info: info
        }});
  
      dialogRef.afterClosed().subscribe(()=>{
        if (this.auth.isLoggedUser(this.username)) {
        this.auth.logout();
        this.router.navigateByUrl('/profile');
      } else {
        this.router.navigateByUrl('/users');
      }
    });
    }

    openAfterSetRoleDialog(title: string, info: string) {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: {
          title: title,
          info: info
        }});
  
      dialogRef.afterClosed().subscribe(()=>{
        if (this.auth.isLoggedAdmin() && this.role.value == 'сотрудник') {
          this.router.navigateByUrl('/profile');
          localStorage.setItem('role', 'сотрудник');
        }
      });
    }

    openAfterResetPasswordDialog(title: string, info: string) {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: {
          title: title,
          info: info
        }});
  
       dialogRef.afterClosed().subscribe(()=>{
        if (this.auth.isLoggedUser(this.username)) {
        this.auth.logout();
        this.router.navigateByUrl('/profile');
        } 
      });
    }

    deleteUser() {
      this.userService.deleteUser(this.username).subscribe((resp: any) => {
        this.openAfterDeleteDialog('Операция выполнена', 'Пользователь был удален!');
        this.isChanged = false;
      }) 
    }  

    resetPassword() {
      this.userService.resetPasswordUser(this.username).subscribe((resp: any) => {
        this.openAfterResetPasswordDialog('Операция выполнена', 'Пароль пользователя был сброшен на служебный!')
      })
    }
}
