import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService:UsuarioService){

    if(this.loginService.userLoggedIn()){
      //controlo si alguien esta logueado, ejecuto acciones normales
    } else {
      //alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']);
    }
  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/empleado';
  }

  login() {
    this.loginService.login(this.userform.username, this.userform.password).subscribe(
    (result: any) => {
      var user = result;
      if (user.status == 1){
        //guardamos el user en cookies en el cliente
        sessionStorage.setItem("user", user.username);
        sessionStorage.setItem("userid", user.userid);
        sessionStorage.setItem("perfil", user.perfil);
        sessionStorage.setItem("idEmp",user.empleado._id);
        sessionStorage.setItem("token", user.token);
        //redireccion a la pagina home
        this.router.navigate(['home']);
      } else {
        //usuario no encontrado muestro mensaje en la vista
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales Incorrectas!',
        });
      }
    },
      (  error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error de conexion!',
        });
        console.log("error en conexion");
        console.log(error);
      });
  }

  usuarioForm(){
    this.router.navigate(['formUsuario']);
  }
}
   

