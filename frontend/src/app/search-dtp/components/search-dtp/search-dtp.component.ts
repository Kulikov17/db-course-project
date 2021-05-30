import { ThrowStmt } from '@angular/compiler';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DtpService } from 'src/app/dtp/services/dtp.service';
import { Person } from 'src/app/shared/models/person';

export interface Typedtp {
  id: number;
  description: string;
}

export interface Affecteddtp {
  id: number;
  person: Person;
}

export class DtpData {
  dtpId: number;
  dateDtp: string;
  timeDtp: string;
  regionDtp: string;
  cityDtp: string;
  dt: Typedtp[];
  affecteddrivers?: Affecteddtp[];
  affectedothers?: Affecteddtp[];
  dtView?: string[];
  affectedDtpView?: string[];
}


@Component({
  selector: 'app-search-dtp',
  templateUrl: './search-dtp.component.html',
  styleUrls: ['./search-dtp.component.css']
})
export class SearchDtpComponent implements AfterViewInit {
  public isLoadData = false;
  displayedColumns: string[] = ['dateDtp', 'timeDtp', 'regionDtp', 'cityDtp', 'typeDtp', 'affectedDtp'];
  dataSource: MatTableDataSource<DtpData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loadUsers() {
    this.isLoadData = true;
    this.dtpService.getAllDtp().subscribe((resp: DtpData[]) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.data.forEach((item) => {
        if (item.dt) {
          let str = '';
          item.dtView = []
          item.dt.forEach((category) => {
            str = category.description;
            item.dtView.push(str);
          });
        }
        if (item.affecteddrivers) {
          let str = '';
          item.affectedDtpView = []
          item.affecteddrivers.forEach((affected) => {
            let patronymic = affected.person.patronymic?  affected.person.patronymic[0]+". " : ""
            str = affected.person.surname+" "+affected.person.name[0] + ". " + patronymic + affected.person.passport;
            item.affectedDtpView.push(str);
          });
        }
        if (item.affectedothers && item.affectedothers.length > 0) {
          let str = '';
          item.affectedothers.forEach((affected) => {
            let patronymic = affected.person.patronymic?  affected.person.patronymic[0]+". " : ""
            str = affected.person.surname+" "+affected.person.name[0] + ". " + patronymic + affected.person.passport;
            item.affectedDtpView.push(str);
          });
        }
      })

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadData = false;
    });
  }
  constructor(private dtpService: DtpService, private router: Router) {
    this.loadUsers();
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
      ['/dtp-search', row.dtpId], 
      {
          queryParams:{
              'dtpId': row.dtpId, 
          }
      }
  );
  }
}

