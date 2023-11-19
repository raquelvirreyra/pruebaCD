import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario!:Usuario;
  empleado!:Empleado;
  empleados!:Array<Empleado>;
  save:boolean=false;
  usuarios:Array<Usuario>=[];
  constructor(private router:Router, private usuarioService:UsuarioService) { 
    this.usuario=new Usuario();
    this.getEmpleados();
    this.usuarios= new Array<Usuario>();
    this.getUsuarios();
  }

  altaUsuario(){

    if(this.comprobarCuenta()==true){
      Swal.fire({
        position: 'center',
            icon: 'error',
            title: 'El empleado ya posee cuenta!',
            showConfirmButton: false,
            timer: 1800
      })
    }else{
      this.usuarioService.altaUsuario(this.usuario).subscribe(
        result=>{
          if(result.status=="1"){
            this.save=true;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario creado correctamente!',
              showConfirmButton: false,
              timer: 1800
            });
            this.router.navigate(['login']);
          }
        },
        error=>{
          if(error.status=="0"){
            this.save=false;
            console.log(error.msg);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Algo salio muy mal!',
              showConfirmButton: false,
              timer: 1800
            });
          }
        }
      )
    }
    
  }

  getEmpleados(){
    this.usuarioService.getEmpleados().subscribe(
      result=>{
        this.empleados=new Array<Empleado>();
        for(let i=0;i<result.length;i++){
          if(result[i].Nombre!="admin"){
          this.empleado=new Empleado();
          Object.assign(this.empleado,result[i]);
          this.empleados.push(this.empleado);
          }
        }
       
      },
      error=>{

      }
    )
  }
  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      result=>{
        result.forEach((element:Usuario)=>{
          this.usuario= new Usuario();
          Object.assign(this.usuario,element);
          this.usuarios.push(this.usuario);
        })
        this.usuario = new Usuario();
      },
      error=>{
        console.log(error);
      }
    )
    
  }

  comprobarCuenta():boolean{
    var bool=false;
      this.usuarios.forEach((elementt:Usuario)=>{
        if(this.usuario.empleado._id==elementt.empleado._id){
          bool=true;
        }
      });
      return bool;
  }

  loginForm(){
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

}
