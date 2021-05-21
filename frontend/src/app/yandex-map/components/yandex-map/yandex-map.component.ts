import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DtpService } from '../../../dtp/services/dtp.service';
import { Dtp } from 'src/app/shared/models/dtp';

declare var ymaps:any;

@Component({
  selector: 'app-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {

  public map :any;
  public dtp: any;
  constructor(private http: HttpClient, private dtpService: DtpService) {
    
  }

  loadDtp() {
    return this.dtpService.getAllDtp()
  }

  ngOnInit(): void {
    this.dtpService.getAllDtp().subscribe((data:Dtp) =>  {
        console.log(data);
        this.loadMaps(data);
    });
    }

    loadMaps(data: Dtp) {
        console.log(data);
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
        console.log( result.geoObjects._collectionComponent._baseArrayComponent)
       // console.log(await this.dtpService.dtp);
        result.geoObjects._collectionComponent._baseArrayComponent._children.forEach(function (feature) {
            var content = feature.properties._data.hintContent 
        
            console.log(data.dateDtp);
            // Для каждого субъекта РФ зададим подсказку с названием федерального округа, которому он принадлежит.
            feature.properties._data.hintContent = content + data[0].dateDtp;
        });
        console.log(result.geoObjects._collectionComponent._baseArrayComponent._children)
        map.geoObjects.add(result.geoObjects)
    });
    });
    }
}





  
