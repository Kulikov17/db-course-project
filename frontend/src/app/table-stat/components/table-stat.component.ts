import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CountDataDto, DtpService } from '../../dtp/services/dtp.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

interface TypeDtp {
  id: number;
  name: string;
}

interface Year {
  value: string;
}

interface Month {
  value: number;
  viewValue: string;
}

export class DtpData {
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
  displayedColumns: string[] = ['regionDtp', 'cityDtp', 'countDtp', 'countDie', 'countHurt'];
  dataSource: MatTableDataSource<DtpData>;

  dataFill: DtpData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  typeDtp: TypeDtp[] = [
    {id: 0, name: 'Общее число'},
    {id: 1, name: 'Столкновение'},
    {id: 2, name: 'Опрокидывание'},
    {id: 3, name: 'Наезд на стоящее транспортное средство'},
    {id: 4, name: 'Наезд на препятствие'},
    {id: 5, name: 'Наезд на пешехода'},
    {id: 6, name: 'Наезд на велосипедиста'},
    {id: 7, name: 'Наезд на гужевой транспорт'},
    {id: 8, name: 'Падение пассажира'},
    {id: 9, name: 'Падение перевозимого груза'},
    {id: 10, name: 'Наезд на внезапно появившееся препятствие'}
  ]

  years: Year[] = [
    {value: 'За все время'},
  ];

  months: Month[] = [
    {value: 0, viewValue: 'За весь год'},
    {value: 1, viewValue: 'Январь'},
    {value: 2, viewValue: 'Февраль'},
    {value: 3, viewValue: 'Март'},
    {value: 4, viewValue: 'Апрель'},
    {value: 5, viewValue: 'Май'},
    {value: 6, viewValue: 'Июнь'},
    {value: 7, viewValue: 'Июль'},
    {value: 8, viewValue: 'Август'},
    {value: 9, viewValue: 'Сентябрь'},
    {value: 10, viewValue: 'Октябрь'},
    {value: 11, viewValue: 'Ноябрь'},
    {value: 12, viewValue: 'Декабрь'}
  ];
  
  selectedTypeDtp = new FormControl(0);
  selectedYear = new FormControl('За все время');
  selectedMonth = new FormControl(0);
  
  
  isLoadData = false;

  public map :any;
  public data = [];
  constructor(private http: HttpClient, private dtpService: DtpService) { 
    this.isLoadData = true;
    this.dataSource = new MatTableDataSource();
    this.selectedMonth.disable();
    this.dtpService.getMinMaxYears().subscribe((data: any) => {
      this.addYear(data[0]);
      this.loadTable();}
    );
  }


  clickBtnSearch() {
    this.isLoadData = true;
    if (this.selectedTypeDtp.value == 0) {
        if (this.selectedYear.value != 'За все время') {
            let startDate
            let endDate
            if (this.selectedMonth.value != 0) {
                startDate = new Date(Number.parseInt(this.selectedYear.value), this.selectedMonth.value - 1, 1);
                endDate = new Date(Number.parseInt(this.selectedYear.value), this.selectedMonth.value, 0);
            } else {
                startDate = new Date(Number.parseInt(this.selectedYear.value), 0, 1);
                endDate = new Date(Number.parseInt(this.selectedYear.value), 12, 0);
            }

            let mindate = moment(startDate).format('YYYY-MM-DD');
            let maxdate = moment(endDate).format('YYYY-MM-DD');

            const findCount: CountDataDto = {
                mindate: mindate,
                maxdate: maxdate
            };
            this.loadTableDate(findCount);
        } else {
            this.loadTable();
        }
    } else  {
        let startDate;
        let endDate;
        if (this.selectedYear.value != 'За все время') {
            if (this.selectedMonth.value != 0) {
                startDate = new Date(Number.parseInt(this.selectedYear.value), this.selectedMonth.value - 1, 1);
                endDate = new Date(Number.parseInt(this.selectedYear.value), this.selectedMonth.value, 0);
            } else {
                startDate = new Date(Number.parseInt(this.selectedYear.value), 0, 1);
                endDate = new Date(Number.parseInt(this.selectedYear.value), 12, 0);
            }
        } else {
            startDate = new Date(Number.parseInt(this.years[1].value), 0, 1);
            endDate = new Date(Number.parseInt(this.years[this.years.length - 1].value), 12, 0);
        }

        let mindate = moment(startDate).format('YYYY-MM-DD');
        let maxdate = moment(endDate).format('YYYY-MM-DD');

        const findCount: CountDataDto = {
            mindate: mindate,
            maxdate: maxdate,
            categoryid: this.selectedTypeDtp.value
        };
        this.loadTableDateCategory(findCount);
    }
  }
  

  addYear(date: any) {
    if (date.mindate == date.maxdate) {
        this.years.push({value: date.mindate});
    } else {
        let min = Number.parseInt(date.mindate);
        let max = Number.parseInt(date.maxdate);
        for (let i = min; i <= max; i++) {
            this.years.push({value: i.toString()});
        }
    }
  }

  clickSelectYear() {
    if (this.selectedYear.value == 'За все время') {
        this.selectedMonth.setValue(0);
        this.selectedMonth.disable();
    } else {
        this.selectedMonth.enable();
    }
  }

  loadTable() {
    this.dtpService.getCountDtpCity().subscribe((data: any) =>  {
      this.data = [];
      this.data.push(data);
      this.dtpService.getCountAffDriversDieCity().subscribe((data: any) => {
          this.data.push(data);
          this.dtpService.getCountAffDriversHurtCity().subscribe((data: any) => {
              this.data.push(data);
              this.dtpService.getCountAffOthersDieCity().subscribe((data: any) => {
                  this.data.push(data);
                  this.dtpService.getCountAffOthersHurtCity().subscribe((data: any) => {
                      this.data.push(data);
                      this.initTable(this.data);
                  })
              })
          })
      })
  });
  }

  loadTableDate(findCount: CountDataDto) {
    this.data = []
    this.dtpService.getCountDtpDateCity(findCount).subscribe((data: any) =>  {
      this.data.push(data);
      this.dtpService.getCountAffDriversDieDateCity(findCount).subscribe((data: any) => {
          this.data.push(data);
          this.dtpService.getCountAffDriversHurtDateCity(findCount).subscribe((data: any) => {
              this.data.push(data);
              this.dtpService.getCountAffOthersDieDateCity(findCount).subscribe((data: any) => {
                  this.data.push(data);
                  this.dtpService.getCountAffOthersHurtDateCity(findCount).subscribe((data: any) => {
                      this.data.push(data);
                      this.initTable(this.data);
                  })
              })
          })
      })
  });
  }

  loadTableDateCategory(findCount: CountDataDto) {
    this.data = [];
    this.dtpService.getCountDtpDateCategoryCity(findCount).subscribe((data: any) =>  {
      this.data.push(data);
      this.dtpService.getCountAffDriversDieDateCategoryCity(findCount).subscribe((data: any) => {
          this.data.push(data);
          this.dtpService.getCountAffDriversHurtDateCategoryCity(findCount).subscribe((data: any) => {
              this.data.push(data);
              this.dtpService.getCountAffOthersDieDateCategoryCity(findCount).subscribe((data: any) => {
                  this.data.push(data);
                  this.dtpService.getCountAffOthersHurtDateCategoryCity(findCount).subscribe((data: any) => {
                      this.data.push(data);
                      this.initTable(this.data);
                  })
              })
          })
      })
  });
  }

  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource();
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
  
  initTable(data: any) {
    
    this.dataFill = [];
    
    for (let i = 0; i < data[0].length; i++) {
      this.dataFill.push({regionDtp: data[0][i].region, cityDtp: data[0][i].city, countDtp: Number.parseInt(data[0][i].count), countDie: 0, countHurt: 0});
    }
   
    for (let i = 0; i < this.dataFill.length; i++) {
      for (let j = 0; j < this.data[1].length; j++) {
        if (this.dataFill[i].regionDtp == data[1][j].region && this.dataFill[i].cityDtp == data[1][j].city) {
          this.dataFill[i].countDie += Number.parseInt(data[1][j].count);
          break;
        }
      }
    }

    for (let i = 0; i < this.dataFill.length; i++) {
      for (let j = 0; j < this.data[2].length; j++) {
        if (this.dataFill[i].regionDtp == data[2][j].region && this.dataFill[i].cityDtp == data[2][j].city) {
          this.dataFill[i].countHurt += Number.parseInt(data[2][j].count);
          break;
        }
      }
    }

    for (let i = 0; i < this.dataFill.length; i++) {
      for (let j = 0; j < this.data[3].length; j++) {
        if (this.dataFill[i].regionDtp == data[3][j].region && this.dataFill[i].cityDtp == data[3][j].city) {
          this.dataFill[i].countDie += Number.parseInt(data[3][j].count);
          break;
        }
      }
    }

    for (let i = 0; i < this.dataFill.length; i++) {
      for (let j = 0; j < this.data[4].length; j++) {
        if (this.dataFill[i].regionDtp == data[4][j].region && this.dataFill[i].cityDtp == data[4][j].city) {
          this.dataFill[i].countHurt += Number.parseInt(data[4][j].count);
          break;
        }
      }
    }

    this.dataSource.data = this.dataFill;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.isLoadData = false;
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

}

