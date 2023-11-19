
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  urlBase:string="http://localhost:3000/api/";

  constructor(private _http:HttpClient) { }

  createEmpleado(empleado:Empleado):Observable<any>{
    const httpOptions={
      headers: new  HttpHeaders({
          "Content-Type": "application/json"
      }),
      params:new HttpParams({
      })
    };
    let body=JSON.stringify(empleado);
    return this._http.post(this.urlBase+"empleado",body,httpOptions)
  }

  updateEmpleado(empleado:Empleado):Observable<any>{
    const httpOptions={
      headers: new  HttpHeaders({
        "Content-Type": "application/json"
      }),
      params:new HttpParams({
      })
    };
    let body=JSON.stringify(empleado);
    return this._http.put(this.urlBase+"empleado/"+empleado._id,body,httpOptions)
  }

  deleteEmpleado(id:string):Observable<any>{
    const httpOptions={
      headers: new  HttpHeaders({
      }),
      params:new HttpParams({
      }).append("id",id)
    };
    return this._http.delete(this.urlBase+ "empleado/"+ id,httpOptions);
}

  getEmpleado(id:string):Observable<any>{
    const httpOptions={
      headers: new  HttpHeaders({
      }),
      params:new HttpParams({
      }).append("id",id)
    };
    return this._http.get(this.urlBase+ "empleado/"+ id,httpOptions);
}

  getEmpleados():Observable<any>{
      const httpOptions={
        headers: new  HttpHeaders({
        }),
        params:new HttpParams({
        }),
      };
      return this._http.get(this.urlBase+ "empleado",httpOptions);
  }
}
