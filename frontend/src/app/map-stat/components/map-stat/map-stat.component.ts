import { Component, OnInit } from '@angular/core';

interface TypeDtp {
  value: string;
  viewValue: string;
}

interface Year {
  value: string;
  viewValue: string;
}

interface Month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-map-stat',
  templateUrl: './map-stat.component.html',
  styleUrls: ['./map-stat.component.css']
})
export class MapStatComponent implements OnInit {
 
  typeDtp: TypeDtp[] = [
    {value: 'дтп-0', viewValue: 'ДТП'},
    {value: 'столкновение-1', viewValue: 'Столкновение'},
    {value: 'крушение-2', viewValue: 'Крушение'},
    {value: 'дети-3', viewValue: 'Аварии с детьми'}
  ];

  year: Year[] = [
    {value: '2018-0', viewValue: '2018'},
    {value: '2019-1', viewValue: '2019'},
    {value: '2020-2', viewValue: '2020'},
    {value: '2021-3', viewValue: '2021'}
  ];

  month: Month[] = [
    {value: 'all-0', viewValue: 'за весь год'},
    {value: 'january-1', viewValue: 'Январь'},
    {value: 'february-2', viewValue: 'Февраль'},
    {value: 'march-3', viewValue: 'Март'},
    {value: 'april-4', viewValue: 'Апрель'},
    {value: 'may-5', viewValue: 'Май'},
    {value: 'june-6', viewValue: 'Июнь'},
    {value: 'july-7', viewValue: 'Июль'},
    {value: 'august-8', viewValue: 'Август'},
    {value: 'september-9', viewValue: 'Сентябрь'},
    {value: 'october-10', viewValue: 'Октябрь'},
    {value: 'november-11', viewValue: 'Ноябрь'},
    {value: 'december-12', viewValue: 'Декабрь'}

  ];
  
  selectedTypeDtp = this.typeDtp[0].value;
  selectedYear = this.year[3].value;
  selectedMonth = this.month[0].value;
  constructor() { }

  ngOnInit(): void {
  }

}
