import { Empleado } from "./empleado";
import { Oficina } from "./oficina"
import { Recurso } from "./recurso"

export class Reunion {
    _id!:string;
    titulo!:string;
    fecha!:Date;
    horaInicio!:string;
    horaFin!:string;
    oficina!:Oficina;
    recursos!:Array<Recurso>;
    tipoReunion!:string;
    estadoReunion!:string;
    participantes!:Array<Empleado>;
    constructor(){

    }
}
