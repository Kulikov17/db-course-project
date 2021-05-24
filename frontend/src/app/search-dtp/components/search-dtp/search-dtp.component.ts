import { ThrowStmt } from '@angular/compiler';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DtpService } from 'src/app/dtp/services/dtp.service';

export interface Typedtp {
  id: number;
  description: string;
}

export class DtpData {
  dtpId: number;
  dateDtp: string;
  timeDtp: string;
  regionDtp: string;
  cityDtp: string;
  dt: Typedtp[];
  dtView?: string;
}


@Component({
  selector: 'app-search-dtp',
  templateUrl: './search-dtp.component.html',
  styleUrls: ['./search-dtp.component.css']
})
export class SearchDtpComponent implements AfterViewInit {
  displayedColumns: string[] = ['dateDtp', 'timeDtp', 'regionDtp', 'cityDtp', 'typeDtp'];
  dataSource: MatTableDataSource<DtpData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loadUsers() {
    this.dtpService.getAllDtp().subscribe((resp: DtpData[]) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.data.forEach((item) => {
        if (item.dt) {
          let str = '';
          item.dt.forEach((category) => {
            str+=category.description+" ";
          });
          item.dtView = str;
        }
      })

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

