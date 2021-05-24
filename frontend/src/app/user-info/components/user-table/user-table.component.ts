import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'role'];
  dataSource: MatTableDataSource<User>;

  newUser: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loadUsers() {
    this.userService.getUsers().subscribe((resp: User[]) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  constructor(private userService: UserService, private router: Router) {
    this.loadUsers();

    this.newUser = new FormGroup({
      "username": new FormControl(""),
      "role": new FormControl("сотрудник"),
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  onSelectClickedEditor(row: any): void {
    this.router.navigate(
      ['/users', row.id], 
      {
          queryParams:{
              'username': row.username, 
          }
      }
  );
  }

  addUser(){
    const user: User = {
      username: this.newUser.controls['username'].value,
      role: this.newUser.controls['role'].value
    };


    this.userService.addUser(user).subscribe(
      (resp: any) => { 
        this.userService.openDialog('Операция выполнена', 'Пользователь успешно добавлен');
        this.loadUsers();
      },
      (error: any) => { 
        this.userService.openDialog('Ошибка', 'Такой пользователь уже существует');
      }
    );
  }
}

