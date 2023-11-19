import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dependencia } from 'src/app/models/dependencia';
import { Empleado } from 'src/app/models/empleado';
import { DependenciaService } from 'src/app/service/dependencia.service';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  dependencias: Array<Dependencia>=new Array<Dependencia>();
  dependenciasAgregar:Array<Dependencia>= new Array<Dependencia>();
  dependencia:Dependencia;
  empleado!:Empleado;
  accion = "";

  constructor(private usuarioService:UsuarioService,
      private router:Router,
      private activatedRoute: ActivatedRoute,
      private dependenciaService: DependenciaService,
      private empleadoService:EmpleadoService) {

  
    this.dependencia= new Dependencia();

    if(!this.usuarioService.userLoggedIn()){
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Necesita iniciar sesion!'
      })
      this.router.navigate(['login']); 
    }else{
      if(this.usuarioService.userPerfil()!="Administrador"){
        Swal.fire({
          icon: 'error',
          title: 'Acceso Prohibido...',
          text: 'No tiene los permisos necesarios!'
        })

        this.router.navigate(['home']);
      }
    }
  }

  altaEmpleado(){
    this.empleado.Dependencias=this.dependenciasAgregar;
    this.empleadoService.createEmpleado(this.empleado).subscribe(
      result => {
        console.log("1"+this.empleado);
        if (result.status == "1") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Empleado creado correctamente!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['empleado'])
        }
      },
      error => {
        console.log("0"+this.empleado);
        if (error.status == "0") {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al crear empleado',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id== "0") {
        this.accion = "new"; 
        this.iniciarEmpleado();
        this.cargarDependencias();
        console.log(this.dependencias);;

      } else {
        this.accion = "update";
        this.iniciarEmpleado();
        this.cargarEmpleado(params.id);
      }
    });
  }

  async cargarDependencias() {
    this.dependencias = new Array<Dependencia>();
    this.dependenciaService.getDependencias().subscribe(
      result => {
        var unaDependencia = new Dependencia();
        result.forEach((element: any) => {
          Object.assign(unaDependencia, element);
          this.dependencias.push(unaDependencia);
          unaDependencia = new Dependencia();
        })
      })
  }

  actualizarEmpleado() {
    this.empleado.Dependencias=this.dependenciasAgregar;
    this.empleadoService.updateEmpleado(this.empleado).subscribe(
      result => {
        if (result.status == "1") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Empleaod Actualizado',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['empleado']);
        }
      },
      error => {
        if (error.status == "0") {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al actualizar empleado',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }


  async cargarEmpleado(id: string) {
    //llamar al servicio de carga de dependencias
   await this.cargarDependencias();
  //llama al servicio para cargar un empleado
    this.empleadoService.getEmpleado(id).subscribe(
      result => {
        this.empleado= new Empleado();
        Object.assign(this.empleado, result);

      //Dependencias de la reunion
      this.empleado.Dependencias.forEach((element:Dependencia)=>{
        this.dependencia= new Dependencia();
        Object.assign(this.dependencia,element);
        this.agregarDependencia(this.dependencia);
        this.dependencia= new Dependencia();
      });
      },
      error => {
        console.log(error);
        alert("error");
      });
  }

  cerrar() {
    this.router.navigate(['empleado']);
  }

  iniciarEmpleado() {
    this.empleado = new Empleado();
  }

  //cargar un array auxilar de los participantes a agregar a la reunion
  agregarDependencia(depe:Dependencia){
    this.dependenciasAgregar.push(depe);
    var index=-1;
    var c=0;
    this.dependencias.forEach((element:Dependencia)=>{
      if(depe._id==element._id){
        index=c;
      }
      c++;
    });
    this.dependencias.splice(index,1);
  }
  quitarDependencia(depe:Dependencia){
   
    this.dependenciasAgregar.splice(this.dependenciasAgregar.indexOf(depe),1);
    this.dependencias.push(depe);
  }


}


