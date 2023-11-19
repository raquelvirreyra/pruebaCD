import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { NotificacionService } from 'src/app/service/notificacion.service';
import { ReunionService } from 'src/app/service/reunion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-reunion-tabla',
  templateUrl: './reunion-tabla.component.html',
  styleUrls: ['./reunion-tabla.component.css']
})
export class ReunionTablaComponent implements OnInit {
  estado:string;
  reuniones:Array<Reunion>=[];
  reunion:Reunion;
  searchText: any;
  
  constructor(private reunionService:ReunionService,private route:Router,private usuarioService:UsuarioService,private notificacionService:NotificacionService) {
    if(usuarioService.userLoggedIn()==false){
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Por favor inicia sesion.',
      })
      route.navigate(['login']);
    } 
    this.reuniones= new Array<Reunion>();
    this.reunion= new Reunion();  
    this.getReuniones();
    this.estado= "Pendiente";
  }

  ngOnInit(): void {
  }

  getReuniones(){
    this.reuniones=new Array<Reunion>();
    this.reunionService.gerReuniones().subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.reunion= new Reunion();
          Object.assign(this.reunion,element);
          this.reuniones.push(this.reunion);
        });
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarReunion(_id:string){
    Swal.fire({
      title: 'Estas seguro/a?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reunionService.deleteReunion(_id).subscribe(
          result=>{
            console.log(result);
            Swal.fire(
              'Eliminada!',
              'La reunion fue eliminada.',
              'success'
            );
            this.getReuniones();
            this.notificacionService.deleteNotificacion(_id).subscribe(
              result=>{
                console.log(result);
              },
              error=>{
                console.log(error);
              }
            )
          },
          error=>{
            console.log(error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Algo salio mal!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        )
      }
    })
  }
  editarReunion(_id:string){
    this.route.navigate(['formReunion',_id]);
  }
  
  imprimirPDF(_id:string){
    this.route.navigate(['resumen',_id]);
  }
  modificarEstado(reu:Reunion){
    console.log(reu);
    this.reunion=new Reunion();
    this.reunion=reu;

    
    
  }

  actualizarEstado(){
    this.reunion.estadoReunion=this.estado;
    
    this.reunionService.updateReunion(this.reunion).subscribe(
      result=>{
        console.log(result);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Estado de Reunion Cambiado correctamente!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error=>{
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo realizar la operacion',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }


}
