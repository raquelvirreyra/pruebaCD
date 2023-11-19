
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  hostBase: string;
  constructor(private _http : HttpClient) {
  this.hostBase = "http://localhost:3000/api/usuario/";
  }
   
  public login(username: string, password: string):Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    console.log(body);
    return this._http.post(this.hostBase + 'login', body, httpOption);
  }

  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("idEmp");
    sessionStorage.removeItem("token");
  } 

  public getIdEmp(){
    var idempleado = sessionStorage.getItem("idEmp");
    return idempleado;
  }

  public userLoggedIn(){
      var resultado = false;
      var usuario = sessionStorage.getItem("user");
      if(usuario!=null){
        resultado = true;
      }
      return resultado;
    }

  public userLogged(){
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }

  public idLogged(){
    var id = sessionStorage.getItem("userid");
    return id;
  }

  public userPerfil(){
    var perfil = sessionStorage.getItem("perfil");
    return perfil;
  }

  public getToken():string{
    if (sessionStorage.getItem("token")!= null){
      return sessionStorage.getItem("token")!;
    }else{
      return "";
    }
  }

   
  /**
   * Peticion GET para solicitar todos los empleados
   * @returns 
   */
   getEmpleados():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    };
    return this._http.get("http://localhost:3000/api/empleado",httpOptions);
  }

  getUsuarios():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      }),
    };
    return this._http.get(this.hostBase,httpOptions);
  }

  /**
   * Peticion POST para dar de alta un Usuario
   * @param pasaje 
   * @returns 
   */
   altaUsuario(usuario:Usuario):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      }),
      params: new HttpParams({

      })
    };
    return this._http.post(this.hostBase,
                                          {
                                            username:usuario.username,
                                            password:usuario.password,
                                            empleado:usuario.empleado._id,
                                            perfil:usuario.perfil},httpOptions);
  }

}
