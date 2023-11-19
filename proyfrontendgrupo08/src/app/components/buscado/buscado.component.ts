import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/service/reunion.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-buscado',
  templateUrl: './buscado.component.html',
  styleUrls: ['./buscado.component.css']
})
export class BuscadoComponent implements OnInit {
  titulo!: string;
  reunion!: Reunion;
  reuniones!: Array<Reunion>;
  constructor(private reunionService: ReunionService, private usuarioService: UsuarioService) {
    this.reunion = new Reunion();
  }

  ngOnInit(): void {
  }

  async buscarTitulo() {
    this.reuniones = new Array<Reunion>();
    this.reunionService.gerReunionesTitulo(this.titulo).subscribe(
      result => {
        result.forEach((element: Reunion) => {
          this.reunion = new Reunion();
          Object.assign(this.reunion, element);
          this.reuniones.push(this.reunion);
        });


      },
      error => {
        console.log(error);
      }
    )

  }

  participa(reunion: Reunion): boolean {
    var existe: boolean = false;
    reunion.participantes.forEach((element: Empleado) => {
      if (element._id == this.usuarioService.getIdEmp()) {
        existe = true;
      }
    })
    return existe;
  }
}
