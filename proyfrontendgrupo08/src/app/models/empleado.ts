import { Dependencia } from "./dependencia";

export class Empleado {

    _id!:string;
    Legajo!:number;
    Apellido!:string;
    Nombre!:string;
    Email!:string;
    Dependencias!:Array<Dependencia>;
    constructor(){
        
    }
}
