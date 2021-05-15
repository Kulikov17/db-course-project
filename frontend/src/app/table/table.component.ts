import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public id = 0;
//  public description = FormControl;
  public date = '2001-12-12';
  public time = '21:50';

  url = 'http://localhost:3000';
  
  //public dtp: Dtp[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  //  this.getDtp();
  }

 /* private getDtp(): void {
    this.tableService.getDtp().subscribe(dtp => {
       this.dtp = dtp;
    });
  }*/

  public async onAddDtp() {
    console.log("fff");
    await this.http.post(this.url + '/test', {}).subscribe((resp: any) => {console.log(resp)})
  }




}
