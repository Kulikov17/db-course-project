import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DtpService } from 'src/app/dtp/services/dtp.service';

export class DtpData {
  id: number;
  dateDtp: string;
  regionDtp: string;
  cityDtp: string;
  countDtp: number;
  countDie: number;
  countHurt: number;
}

@Component({
  selector: 'app-table-stat',
  templateUrl: './table-stat.component.html',
  styleUrls: ['./table-stat.component.css']
})
export class TableStatComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'dateDtp', 'regionDtp', 'cityDtp', 'countDtp', 'countDie', 'countHurt'];
  dataSource: MatTableDataSource<DtpData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dtpService: DtpService, private router: Router) {
    let dtp: DtpData[] = []
    this.dtpService.getAllDtp().subscribe((resp:any) => {
      console.log(resp);
    });
   
    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
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
    const url = `dtp-search/${row.id}`;
    this.router.navigateByUrl(url);
  }

}

