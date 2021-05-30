import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountDataDto, DtpService } from '../../../dtp/services/dtp.service';
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

declare var ymaps:any;

@Component({
  selector: 'app-map-stat',
  templateUrl: './map-stat.component.html',
  styleUrls: ['./map-stat.component.css']
})
export class MapStatComponent implements OnInit {
 
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
  }

  clickBtnSearch() {
    document.querySelectorAll('.ymaps-2-1-78-map').forEach(function(a){
        a.remove()
    });
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
            this.loadMapDate(findCount);
        } else {
            this.loadMap();
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
        this.loadMapDateCategory(findCount);
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
        this.selectedMonth.setValue('0');
        this.selectedMonth.disable();
    } else {
        this.selectedMonth.enable();
    }
  }
  ngOnInit(): void {
    this.isLoadData = true;
    this.selectedMonth.disable();
    this.dtpService.getMinMaxYears().subscribe((data: any) => {
        this.addYear(data[0]);
        this.dtpService.getCountDtp().subscribe((data: any) =>  {
            this.data.push(data);
            this.dtpService.getCountAffDriversDie().subscribe((data: any) => {
                this.data.push(data);
                this.dtpService.getCountAffDriversHurt().subscribe((data: any) => {
                    this.data.push(data);
                    this.dtpService.getCountAffOthersDie().subscribe((data: any) => {
                        this.data.push(data);
                        this.dtpService.getCountAffOthersHurt().subscribe((data: any) => {
                            this.data.push(data);
                            this.initMap(this.data);
                        })
                    })
                })
            })
        });
    });
  }

  loadMap() {
    this.dtpService.getCountDtp().subscribe((data: any) =>  {
      this.data = [];
      this.data.push(data);
      this.dtpService.getCountAffDriversDie().subscribe((data: any) => {
          this.data.push(data);
          this.dtpService.getCountAffDriversHurt().subscribe((data: any) => {
              this.data.push(data);
              this.dtpService.getCountAffOthersDie().subscribe((data: any) => {
                  this.data.push(data);
                  this.dtpService.getCountAffOthersHurt().subscribe((data: any) => {
                      this.data.push(data);
                      this.initMap(this.data);
                  })
              })
          })
      })
  });
  }

  loadMapDate(findCount: CountDataDto) {
    this.data = []
    this.dtpService.getCountDtpDate(findCount).subscribe((data: any) =>  {
      this.data.push(data);
      this.dtpService.getCountAffDriversDieDate(findCount).subscribe((data: any) => {
          this.data.push(data);
          this.dtpService.getCountAffDriversHurtDate(findCount).subscribe((data: any) => {
              this.data.push(data);
              this.dtpService.getCountAffOthersDieDate(findCount).subscribe((data: any) => {
                  this.data.push(data);
                  this.dtpService.getCountAffOthersHurtDate(findCount).subscribe((data: any) => {
                      this.data.push(data);
                      this.initMap(this.data);
                  })
              })
          })
      })
  });
  }

  loadMapDateCategory(findCount: CountDataDto) {
    this.data = [];
    this.dtpService.getCountDtpDateCategory(findCount).subscribe((data: any) =>  {
      this.data.push(data);
      this.dtpService.getCountAffDriversDieDateCategory(findCount).subscribe((data: any) => {
          this.data.push(data);
          this.dtpService.getCountAffDriversHurtDateCategory(findCount).subscribe((data: any) => {
              this.data.push(data);
              this.dtpService.getCountAffOthersDieDateCategory(findCount).subscribe((data: any) => {
                  this.data.push(data);
                  this.dtpService.getCountAffOthersHurtDateCategory(findCount).subscribe((data: any) => {
                      this.data.push(data);
                      this.initMap(this.data);
                  })
              })
          })
      })
  });
  }

  initMap(data: any) {
    ymaps.ready(function () {
        var map = new ymaps.Map('map', {
            center: [65, 100],
            zoom: 2,
            type: null,
            controls: ['zoomControl']
        },{
            restrictMapArea: [[10, 10], [85,-160]]
        });
        map.controls.get('zoomControl').options.set({size: 'small'});
        // Добавим заливку цветом.
        var pane = new ymaps.pane.StaticPane(map, {
            zIndex: 100, css: {
                width: '100%', height: '100%', backgroundColor: '#f7f7f7'
            }
        });
        map.panes.append('white', pane);
        var districtColors = {
            cfo: '#ffff6f',
            szfo: '#54cbba',
            yfo: '#f9768e',
            skfo: '#9a5597',
            pfo: '#30cb05',
            urfo: '#bac1cc',
            sfo: '#16acdb',
            dfo: '#fbc520'
        };
    ymaps.regions.load('RU', {
        lang: 'ru',
        
    }).then(function (result) {

        function findCount(data, index, content) {
            let count = 0;
            for (let i = 0; i < data[index].length; i++) {
                if (data[index][i].region == content) {
                    count = Number.parseInt(data[index][i].count);
                    break;
                }
            }
            return count;
        }

        
        result.geoObjects._collectionComponent._baseArrayComponent._children.forEach(function (feature) {
            var content = feature.properties._data.hintContent 
        
            let count = findCount(data, 0, content);
            let die = findCount(data, 1, content);
            let hurt = findCount(data, 2, content);
            die += findCount(data, 3, content);
            hurt += findCount(data, 4, content);

            feature.properties._data.hintContent = content + "<br>Кол-во ДТП: " + count + "<br>Кол-во погибших: " + die + "<br>Кол-во раненных: " + hurt;
        });
        map.geoObjects.add(result.geoObjects)
    });
    });
    this.isLoadData = false;
    }
}