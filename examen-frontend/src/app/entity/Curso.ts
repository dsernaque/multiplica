export class Curso {

    constructor(
        public _id:string,    	
        public codigo:number,  
        public nombre: string,
        public descripcion: string,
        public anio:string,
        public alumnos_ids:string[]    
		){ }
}