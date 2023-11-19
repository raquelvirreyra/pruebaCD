import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  hostBase: string;
  constructor(private _http: HttpClient) {
    this.hostBase= "http://localhost:3000/api/notificacion/";
   }

   public createNotificacion(notificacion:Notificacion):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this._http.post(this.hostBase,{leido: notificacion.leido,empleado: notificacion.empleado, reunion:notificacion.reunion} ,httpOption);
   }

   public getNotificacionesEmpleado(empleado_id:string):Observable<any>{
    const httpOption={
      headers: new HttpHeaders({

      })
    }

    return this._http.get(this.hostBase+empleado_id,httpOption);
   }

   public deleteNotificacion(reunion_id:string):Observable<any>{
    const httpOption={
      headers: new HttpHeaders({

      })
    }

      return this._http.delete(this.hostBase+reunion_id,httpOption);
    }

    public updateLeido(notificacion:Notificacion):Observable<any>{
      const httpOptions ={
        header: new HttpHeaders({
          'Content-Type':'application/json' 
        }),
        params: new HttpParams({})
      };
      return this._http.put(this.hostBase+notificacion._id,{_id:notificacion._id,leido:notificacion.leido,empleado:notificacion.empleado,reunion:notificacion.reunion},httpOptions);
    }
   
}
