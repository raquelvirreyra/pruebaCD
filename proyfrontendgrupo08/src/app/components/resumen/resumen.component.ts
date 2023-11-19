import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReunionService } from 'src/app/service/reunion.service';
import { Reunion } from 'src/app/models/reunion';
import { Empleado } from 'src/app/models/empleado';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels, NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  title = 'extraQRcode';
  elementType = NgxQrcodeElementTypes.URL
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
  value='';
  
  reunion:Reunion;
  empleado!:Empleado;
  empleados!:Array<Empleado>;
  accion="";

  constructor(private reunionService:ReunionService,private activatedRoute:ActivatedRoute,public loginService:UsuarioService,private router:Router) {
   /*  if(loginService.userLoggedIn()==false){
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Por favor inicia sesion.',
      })
      router.navigate(['login']);
    }  */
    this.reunion=new Reunion();
    this.empleado=new Empleado();
    this.empleados=new Array<Empleado>();

  }

  downloadPDF() {
    // Extraemos el
    const DATA :any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_ResumenReunion.pdf`);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']==0){
        this.accion="new";
      }else{   
       this.accion="up";
       this.obtenerReunion(params['id']);  
       this.value="http://localhost:4200/resumen/"+params['id'];
      }
    });
  }

  obtenerReunion(_id:string){
    this.reunionService.getReunion(_id).subscribe(
      result=>{
          this.reunion= new Reunion();
          Object.assign(this.reunion,result);
          console.log(this.reunion.participantes);  
      },
      error=>{
        console.log(error);
      }
    )
  }
  
}
