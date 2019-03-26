import { Curso } from "./Curso";
import { Alumno } from "./Alumno";

export class RespuestaService{
    constructor(
        public codigo:string,
        public mensaje:string,
        public cursos:Curso[],
        public alumnos:Alumno[],
        public cantRegistros:number
    ){ }
}
