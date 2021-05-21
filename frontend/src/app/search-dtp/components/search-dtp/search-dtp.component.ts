import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface DtpData {
  id: string;
  dateDtp: string;
  timeDtp: string;
  regionDtp: string;
  cityDtp: string;
  typeDtp: string;
  affectedDtp: string;
}

const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-search-dtp',
  templateUrl: './search-dtp.component.html',
  styleUrls: ['./search-dtp.component.css']
})
export class SearchDtpComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'dateDtp', 'timeDtp', 'regionDtp', 'cityDtp', 'typeDtp', 'affected'];
  dataSource: MatTableDataSource<DtpData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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

function createNewUser(id: number): DtpData {
  return {
    id: id.toString(),
    dateDtp: '2020-02-08'+id.toString(),
    timeDtp: '21:00'+id.toString(),
    regionDtp: 'Республика Мордовия'+id.toString(),
    cityDtp: 'Саранск'+id.toString(),
    typeDtp: 'Столкновение, Опрокидывание'+id.toString(),
    affectedDtp: 'Куликов Дмитрий'+id.toString()
  };
}


