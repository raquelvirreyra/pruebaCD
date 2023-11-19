import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Empleado } from 'src/app/models/empleado';
import { Oficina } from 'src/app/models/oficina';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { OficinaService } from 'src/app/service/oficina.service';
import { ReunionService } from 'src/app/service/reunion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  oficinas:Array<Oficina>=[];
  reuniones:Array<Reunion>=[];
  participantes:Array<Empleado>=[];
  participante:Empleado;
  oficina:Oficina;
  reunion:Reunion;
  chartBar!:Chart;
  chartPie!:Chart;
  mostrar:Array<number>=[];
  mostrarLabel:Array<string>=[];
  dateStart:Date;
  dateEnd:Date;
  constructor(private reunionService:ReunionService,private empleadoService:EmpleadoService,private oficinaService:OficinaService,private usuarioService:UsuarioService,private router:Router) {
    if(usuarioService.userLoggedIn()==false){
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Por favor inicia sesion.',
      })
      router.navigate(['login']);
    }  
    this.mostrar= new Array<number>();
    this.mostrarLabel= new Array<string>();
    this.reuniones= new Array<Reunion>();
    this.reunion= new Reunion;
    this.participantes= new Array<Empleado>();
    this.participante= new Empleado();
    this.oficinas= new Array<Oficina>();
    this.oficina= new Oficina();
    this.dateStart= new Date();
    this.dateEnd= new Date();
    this.getReuniones();
    this.getParticipantes();
    this.getOficinas();
  }

  ngOnInit(): void {

  }
  /*
  Dibujar la estadistica en Barra
  */
 charBarra(datos:Array<number>,mostrar:Array<string>){
  if (this.chartBar) {
    this.chartBar.destroy();
  }
  this.chartBar= new Chart("chartBar", {
    type: 'bar',
    data: {
        labels: mostrar,
        datasets: [{
            label: 'participo en reuniones',
            data: datos,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
});
 }
 /*
  Dibujar la estadistica en torta
 */
 charTorta(datos:Array<number>,mostrar:Array<string>){
  if (this.chartPie) {
    this.chartPie.destroy();
  }
  this.chartPie= new Chart("chartPie", {
    type:'pie',
    data: {
        labels: mostrar,
        datasets: [{
            label: 'participo en reuniones',
            data: datos,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            hoverOffset: 4
        }]
    }
});
 }
 async getOficinas(){
  this.oficinas=  new Array<Oficina>();
  this.oficinaService.getOficinas().subscribe(
    result=>{
      result.forEach((element:Oficina)=>{
        this.oficina= new Oficina();
        Object.assign(this.oficina,element);
        this.oficinas.push(this.oficina);
      });
    },
    error=>{
      console.log(error);
    }
  )
 }
 async getReuniones(){
    this.reuniones= new Array<Reunion>();
    this.reunionService.gerReuniones().subscribe(
      result=>{
        result.forEach((element:Reunion)=>{
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
 async getParticipantes(){
    this.participantes= new Array<Empleado>();
    this.empleadoService.getEmpleados().subscribe(
      result=>{
        result.forEach((element:Empleado)=>{
          this.participante= new Empleado();
          Object.assign(this.participante,element);
          this.participantes.push(this.participante);
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
  participantesChar(){
    this.mostrar= new Array<number>();
    this.mostrarLabel= new Array<string>();
    var index=0;
    var c=0;
   var b=0;
   this.participantes.forEach((element:Empleado)=>{
    this.mostrar[b]=0;
    this.mostrarLabel[b]=element.Apellido+" "+element.Nombre;
    b++;
   });
    this.reuniones.forEach((element:Reunion)=>{
      element.participantes.forEach((elementt:Empleado)=>{
      this.participantes.forEach((elementtt:Empleado)=>{
        if(elementtt._id==elementt._id){
           c++;
           this.mostrar[index]=this.mostrar[index]+c;
        }
        index++;
        });
        c=0;
        index=0;
      });
      
    });
    this.charBarra(this.mostrar,this.mostrarLabel);
    this.charTorta(this.mostrar,this.mostrarLabel);
  };
  oficinasChar(){
    this.mostrar= new Array<number>();
    this.mostrarLabel= new Array<string>();
    var index=0;
    var c=0;
    var b=0;
    this.oficinas.forEach((element:Oficina)=>{
      this.mostrar[b]=0;
      this.mostrarLabel[b]="oficina nro: "+element.numero;
      b++;
     });
   
   this.reuniones.forEach((element:Reunion)=>{
    this.oficinas.forEach((elementt:Oficina)=>{
      if(element.oficina._id==elementt._id){
        c++;
        this.mostrar[index]=this.mostrar[index]+c;
      }
      index++;
    });
    c=0;
    index=0;
   });
   this.charBarra(this.mostrar,this.mostrarLabel);
   this.charTorta(this.mostrar,this.mostrarLabel);
  }
  tipoReunionChar(){
      var arr:Array<string>;
      arr=["Urgente","Alta","Normal"];
      this.mostrar=[0,0,0];
      this.mostrarLabel=["Urgente: ","Alta: ","Normal: "];


      var index=0;
      var c=0;
      this.reuniones.forEach((element:Reunion)=>{
        arr.forEach((elementt:string)=>{
          if(element.tipoReunion==elementt){
            c++
            this.mostrar[index]=this.mostrar[index]+c;
          }
          index++;
        });
        c=0;
        index=0;
      });

      this.charBarra(this.mostrar,this.mostrarLabel);
      this.charTorta(this.mostrar,this.mostrarLabel);
  }
  mesChar(){
    
    var arr:Array<number>;
      arr=[1,2,3,4,5,6,7,8,9,10,11,12];
      this.mostrar=[0,0,0,0,0,0,0,0,0,0,0,0];
      this.mostrarLabel=["Enero: ","Febrero: ","Marzo: ","Abril: ","Mayo: ","Junio: ","Julio: ","Agosto: ","Septiembre: ","Octubre: ","Noviembre: ","Diciembre: "];

      var index=0;
      var c=0;
      this.reuniones.forEach((element:Reunion)=>{
        arr.forEach((elementt:number)=>{
          if((new Date(element.fecha).getMonth())==elementt){
            c++
            this.mostrar[(new Date(element.fecha).getMonth())]=this.mostrar[(new Date(element.fecha).getMonth())]+c;
          }
        });
        c=0;
        index=0;
      });

      this.charBarra(this.mostrar,this.mostrarLabel);
      this.charTorta(this.mostrar,this.mostrarLabel);
  }
  anioChar(){
    var array:Array<number>;
    array=[2020,2021,2022,2023];
    this.mostrar=[0,0,0,0];
    this.mostrarLabel=["2020: ","2021: ","2022: ","2023: "];

    var index=0;
      var c=0;
      this.reuniones.forEach((element:Reunion)=>{
        array.forEach((elementt:number)=>{
          if(elementt==(new Date(element.fecha).getFullYear())){
            c++
            this.mostrar[index]=this.mostrar[index]+c;
          }
          index++;
        });
        c=0;
        index=0;
      });

      this.charBarra(this.mostrar,this.mostrarLabel);
      this.charTorta(this.mostrar,this.mostrarLabel);
  }
  periodoChar(){
    var array:Array<Date>;
    array=[this.dateStart,this.dateStart,this.dateEnd];
    this.mostrar=[0,0,0];
    this.mostrarLabel=["reunion con fecha menor que: "+this.dateStart,"reuniones entre: "+this.dateStart+"-"+this.dateEnd,"reunion con fecha mayor que: "+this.dateEnd]
 
    var index=0;
    var c=0;
    this.reuniones.forEach((element:Reunion)=>{
      array.forEach((elementt:Date)=>{
     
        if(new Date(elementt).getFullYear()<=new Date(this.dateStart).getFullYear() && new Date(elementt).getMonth()<=new Date(this.dateStart).getMonth()&&new Date(elementt).getDay()<=new Date(this.dateStart).getDay()){
          c++;
          this.mostrar[index]=this.mostrar[index]+c;
        }
        if((new Date(element.fecha).getFullYear()>=new Date(this.dateStart).getFullYear() &&   new Date(element.fecha).getMonth()>=new Date(this.dateStart).getMonth() && new Date(element.fecha).getDay()>=new Date(this.dateStart).getDay()) && (new Date(element.fecha).getFullYear<=new Date(this.dateEnd).getFullYear && new Date(element.fecha).getMonth<=new Date(this.dateEnd).getMonth && new Date(element.fecha).getDay<=new Date(this.dateEnd).getDay)){
          c++;
          this.mostrar[index]=this.mostrar[index]+c;
        }
        if(new Date(element.fecha).getFullYear()>=new Date(this.dateEnd).getFullYear() && new Date(element.fecha).getMonth()>=new Date(this.dateEnd).getMonth() && new Date(element.fecha).getDay()>=new Date(this.dateEnd).getDay()){
          c++;
          this.mostrar[index]=this.mostrar[index]+c; 
        }

        index++;
      });
      c=0;  
      index=0;
    });
    console.log(this.mostrar);
    this.charBarra(this.mostrar,this.mostrarLabel);
    this.charTorta(this.mostrar,this.mostrarLabel);
  }

}
