import { Injectable } from '@angular/core';
import { Dtp } from '../shared/models/dtp';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  public dtp: Dtp[];
  
  private routerUrl = 'http://localhost:3000/dtp';


  constructor(private http: HttpClient) { }

  public getDtp(): Observable<Dtp[]> {
    return this.http.get<Dtp[]>(this.routerUrl);
  }
  public async addDtp(dtp:Dtp) {
    await this.http.post(this.routerUrl, dtp).toPromise();
  }
}
