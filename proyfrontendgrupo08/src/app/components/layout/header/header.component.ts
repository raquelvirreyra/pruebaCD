import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notificacion } from 'src/app/models/notificacion';
import { NotificacionService } from 'src/app/service/notificacion.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notificaciones:Array<Notificacion>=[];
  notificacion:Notificacion;
  cNoti:number=0;
  constructor(public loginService: UsuarioService,private router: Router,private notificacionService:NotificacionService) { 
    this.notificaciones= new Array<Notificacion>();
    this.notificacion= new Notificacion();

    this.cargarNotificaciones();
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

  usuarioForm(){
    this.router.navigate(['formUsuario']);
  }
  getNotificaciones(){
    var id:string;
    id= this.loginService.getIdEmp()!;
    this.notificacionService.getNotificacionesEmpleado(id).subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.notificacion= new Notificacion();
          Object.assign(this.notificacion,element);
          this.notificaciones.push(this.notificacion);
          if(this.notificacion.leido==false){
            this.cNoti++;
          }
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
  cargarNotificaciones(){
    if(this.loginService.userLoggedIn()==true && this.loginService.getIdEmp()!=null){
      this.getNotificaciones();
      }
  }
  actualizarLeido(noti:Notificacion){
    
    this.notificacionService.updateLeido(noti).subscribe(
      result=>{
        console.log(result);
        var n=0;
        this.notificaciones.forEach((element:Notificacion)=>{
          if(element.leido==false){
            n++;
          }
        });
        this.cNoti=n;
      },
      error=>{
        console.log(error);
      }
    )
    }
  login(){
    this.router.navigate(['login']);
  }
}
