import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dependencia } from '../models/dependencia';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {
  urlBase:string="http://localhost:3000/api/dependencia/";

  constructor(private _http:HttpClient) { 
  }

  createDependencia(dependencia:Dependencia):Observable<any>{
    const httpOptions={
      headers: new  HttpHeaders({
   "Content-Type": "application/json"
      }),
      params:new HttpParams({
      })
    };
    let body=JSON.stringify(dependencia);
    return this._http.post(this.urlBase,body,httpOptions)
  }

  getDependencia(id:string):Observable<any>{
    const httpOptions={
      headers: new  HttpHeaders({
      }),
      params:new HttpParams({
      }).append("id",id)
    };
    return this._http.get(this.urlBase+ id,httpOptions);
}

  getDependencias():Observable<any>{
      const httpOptions={
        headers: new  HttpHeaders({
        }),
        params:new HttpParams({
        }),
      };
      return this._http.get(this.urlBase,httpOptions);
  }
}



