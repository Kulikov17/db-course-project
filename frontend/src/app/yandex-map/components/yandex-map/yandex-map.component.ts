import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var ymaps:any;

@Component({
  selector: 'app-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {

  public map :any;
  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
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
        result.geoObjects._collectionComponent._baseArrayComponent._children.forEach(function (feature) {
            var content = feature.properties._data.hintContent 
            // Для каждого субъекта РФ зададим подсказку с названием федерального округа, которому он принадлежит.
            feature.properties._data.hintContent = content + "<br>Колобок";
        });
        console.log(result.geoObjects._collectionComponent._baseArrayComponent._children)
        map.geoObjects.add(result.geoObjects)
    });
    });

    }




}
  
