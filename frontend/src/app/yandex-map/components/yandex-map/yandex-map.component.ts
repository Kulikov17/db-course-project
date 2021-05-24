import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DtpService } from '../../../dtp/services/dtp.service';
import { Dtp } from 'src/app/shared/models/dtp';
import { findLast } from '@angular/compiler/src/directive_resolver';

declare var ymaps:any;

@Component({
  selector: 'app-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {

  public map :any;
  public dtp: any;
  public data: Dtp;
  constructor(private http: HttpClient, private dtpService: DtpService) {
    
  }

  findIndex(index: number) {
      return index;
  }

  ngOnInit(): void {
    this.dtpService.getAllDtp().subscribe((data:Dtp) =>  {
        this.data = data;
        this.loadMaps(data);
    });
  }

    loadMaps(data: Dtp) {
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
        function findIndex(data, content) {
            let count = [0, 0, 0];
            data.forEach(item => {
                if (item.regionDtp == content) {
                    count[0] += 1;
                    item.affecteddrivers.forEach(aff => {
                        if (aff.health == 'погиб') {
                            count[1] += 1;
                        } else if (aff.health == 'ранен') {
                            count[2] += 1;
                        }
                    });
                    item.affectedothers.forEach(aff => {
                        if (aff.health == 'погиб') {
                            count[1] += 1;
                        } else if (aff.health == 'ранен') {
                            count[2] += 1;
                        }
                    });
                }
            });
            return count;
        }
        console.log( result.geoObjects._collectionComponent._baseArrayComponent)
        result.geoObjects._collectionComponent._baseArrayComponent._children.forEach(function (feature) {
            var content = feature.properties._data.hintContent 
        
            let res = findIndex(data, content);

            feature.properties._data.hintContent = content + "<br>Кол-во ДТП: " +  res[0] + "<br>Кол-во погибших: " + res[1] + "<br>Кол-во раненных: " + res[2];
        });
        console.log(result.geoObjects._collectionComponent._baseArrayComponent._children)
        map.geoObjects.add(result.geoObjects)
    });
    });
    }
}





  
