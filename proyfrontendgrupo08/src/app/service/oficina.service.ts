import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OficinaService {
  hostBase: string;


  constructor(private _http: HttpClient) {
    this.hostBase= "http://localhost:3000/api/oficina/";
   }
   public getOficinas():Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.hostBase, httpOption);
   }
}
