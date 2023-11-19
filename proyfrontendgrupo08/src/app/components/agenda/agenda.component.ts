import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/service/reunion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels, NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  title = 'extraQRcode';
  elementType = NgxQrcodeElementTypes.URL
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
  values:{id: string,value:string}[]=[];


  reunion!:Reunion;
  reunion1!:Reunion;
  reuniones!:Array<Reunion>;
  reunionesemp!:Array<Reunion>;

  constructor(private reunionService:ReunionService,private usuarioService:UsuarioService,private router:Router) {
    if(usuarioService.userLoggedIn()==false){
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Por favor inicia sesion.',
      })
      router.navigate(['login']);
    } 
    this.getReuniones();
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
        this.getReunionesporEmpleado();
      },
      error=>{
        console.log(error);
      }
    )
  }

  getReunionesporEmpleado(){
    var c=0;
    this.reunionesemp=new Array<Reunion>();//Array auxiliar de reuniones
    this.reuniones.forEach((element:Reunion)=> {
      element.participantes.forEach((element2:Empleado)=> {
          if(element2._id==this.usuarioService.getIdEmp()){
            this.reunionesemp.push(element);
            this.values[c]={
              id: element._id,
              value: "http://localhost:4200/resumen/"+element._id

            }
            c++;
          }
      });
    });
  }

  ngOnInit(): void {
  }

  obtenerQR(_id:string):string{
    var value="";
    this.values.forEach((element:any)=>{
      if(element.id=_id){
        value=element.value;
      }
    })
    return value;
  }

}
