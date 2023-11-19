import { Empleado } from "./empleado";
import { Reunion } from "./reunion";

export class Notificacion {
    _id!:string;
    leido!:boolean;
    empleado!: Empleado;
    reunion!: Reunion;

    constructor(){
               
    }
}
