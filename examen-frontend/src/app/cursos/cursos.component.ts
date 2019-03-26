import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Curso } from '../entity/Curso';
import { Alumno } from '../entity/Alumno';
import { CursosService } from './cursos.service';
import { RespuestaService } from '../entity/RespuestaService';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [ConfirmationService, CursosService]
})
export class CursosComponent implements OnInit {
  @ViewChild("dataTableComp") dataTableComponent: Table;
  response: RespuestaService;  
  isPreview = false;
  displayProgressBar = false;
  rowsCursos: Curso[];
  idCurso: string;
  page = { sizePerPage: 10, totalElements: 0, index: 0, rows: 0 };
  isLoading = false;
  selectedSols: any[];
  cols: any[];
  titleModal: string;
  displayModal = false;
  codigoCurso: string;
  nombreCurso: string;
  anioCurso: string;
  descripcionCurso:string;
  alumnosCurso: string[];

  rowCurso:Curso;
  rowsAlumnos: Alumno[];
  displayModalAlumnos= false;
  constructor(
    private CursosService: CursosService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
  }

  loadSolicityLazy(params) {
    this.listarCursos(params);
  }

  listarCursos(params) { 
    this.isLoading = true;
    let desde = (params.first | 0) + 1;
    let hasta = desde + (params.rows | 0) - 1;     
    this.showModalProgressBar();
    this.CursosService.getCursos(desde, hasta).subscribe(
      data => {
        this.hideModalProgressBar();
        this.response = new RespuestaService(null, null, null,null,null);
        this.response = data;
        console.log("respuesta service: " + data);
        if (this.response.codigo=='1'){         
          this.rowsCursos = this.response.cursos;     
          console.log("cursos: " + this.rowsCursos[0].codigo); 
          this.page.totalElements = this.response.cantRegistros;     
        } else {
         // this.notificationService.notify('warn', 'Listar Solicitud', 'Ocurrió un error.' );
          console.log("Ocurrió un error.");
        }         
      },
      error => {
        this.hideModalProgressBar();
        //this.notificationService.notify('error','Listar Solicitud PML', 'Ocurrió un error'); 
        console.log("Ocurrió un error.");         
      }
    );
  }

  onSubmit(model) {   
    if (!model.codigo || !model.nombre || !model.descripcion|| !model.anio) {
      console.log("Campo requerido");
      //this.notificationService.notify('warn', 'Campo requerido', 'Ingrese la descripción.');
    } else { 
      model._id= this.idCurso;
      model.alumnos_ids=this.alumnosCurso;     
      console.log("ID CRSO: "+ model._id);   
      this.CursosService.saveCurso(model).subscribe(data => {          
      this.response = new RespuestaService(null, null, null,null,null);
      this.response = data;
      console.log("respuesta de servicio registar: " + data);       
      if (this.response.codigo == '1') {
        console.log("SE CREO CORRECTAMENTE");
        //this.notificationService.notify('success', 'Registrar Solicitud PML', 'Datos grabados correctamente.');
        this.page.index = 0;
        this.displayModal = false;
        this.dataTableComponent.reset();
      }
      else {
        //this.notificationService.notify('error', 'Registrar Solicitud PML', this.response.mensaje.toString());
        console.log("Ocurrió un error.");
      }  
      },
      error => {
        //this.notificationService.notify('error','Registrar Solicitud PML', 'Ocurrió un error');      
        console.log("Ocurrió un error.");    
      }
      );
    }   
  }

  anular(idCurso: string){
    console.log("metodo anular");
    this.confirmationService.confirm({
      message: 'Desea anular el curso?',
      header: 'Confirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.showModalProgressBar();
        this.CursosService.anularCurso(idCurso).subscribe(data => {
          this.hideModalProgressBar();
          this.response = new RespuestaService(null, null, null,null,null);
          this.response = data;
          if (this.response.codigo = '1'){
            //this.notificationService.notify('success', 'Anular Solicitud', 'Se anuló la solicitud correctamente');
            console.log("se anulo");
            this.dataTableComponent.reset();          
          } else {
            //this.notificationService.notify('error', 'Anular Solicitud', 'Ocurrio un error.');
            console.log("error al anular");
          }
        },
        error =>{
          this.hideModalProgressBar();
          //this.notificationService.notify('error', 'Anular Solicitud', 'Ocurrio un error.');
          console.log("error al anular ERRORR");
        });
      },
      reject: () => {          
      }
    });
  }

  listarAlumnos(row) { 
    this.idCurso=row._id;  
    console.log("listar alumnos de curso: " + this.idCurso);
    this.CursosService.getAlumnos(this.idCurso).subscribe(
      data => {      
        this.response = new RespuestaService(null, null, null,null,null);
        this.response = data;
        console.log("respuesta service: " + data);
        if (this.response.codigo=='1'){         
          this.rowsAlumnos = this.response.alumnos;              
          this.page.totalElements = this.response.cantRegistros;    
          this.showModalAlumnos();
        } else {
         // this.notificationService.notify('warn', 'Listar Solicitud', 'Ocurrió un error.' );
          console.log("Ocurrió un error.");
        }         
      },
      error => {
        this.hideModalProgressBar();
        //this.notificationService.notify('error','Listar Solicitud PML', 'Ocurrió un error'); 
        console.log("Ocurrió un error.");         
      }
    );
  }

  eliminarAlumno(idAlumno: string){  
    console.log("metodo anular alumno");
    this.showModalProgressBar();
    this.CursosService.eliminarAlumno(this.idCurso,idAlumno).subscribe(data => {
      this.hideModalProgressBar();
      this.response = new RespuestaService(null, null, null,null,null);
      this.response = data;
      if (this.response.codigo = '1'){
        //this.notificationService.notify('success', 'Anular Solicitud', 'Se anuló la solicitud correctamente');
        console.log("se elimino el alumno");
        this.dataTableComponent.reset();          
      } else {
        //this.notificationService.notify('error', 'Anular Solicitud', 'Ocurrio un error.');
        console.log("error al anular");
      }
    },
    error =>{
      this.hideModalProgressBar();
      //this.notificationService.notify('error', 'Anular Solicitud', 'Ocurrio un error.');
      console.log("error al anular alumno ERRORR");
    });
  }

  editar(row) { 
    this.idCurso= row._id;     
    this.alumnosCurso=row.alumnos_ids;
    this.codigoCurso= row.codigo;
    this.nombreCurso= row.nombre;
    this.anioCurso= row.anio;
    this.descripcionCurso=row.descripcion;
    this.showModal(row);   
  }

  showModal(row) {
    if (row == null)
      this.titleModal = 'Agregar Curso';
    else
      this.titleModal = 'Modificar Curso';
    this.isPreview = false;
    this.displayModal = true;
  }

  showModalAlumnos() {   
    this.titleModal = 'Alumnos Inscritos';
    this.isPreview = false;
    this.displayModalAlumnos = true;
  }

  showModalProgressBar() {
    this.isPreview = false;
    this.displayProgressBar = true;
  }

  hideModalProgressBar() {
    this.isPreview = false;
    this.displayProgressBar = false;
  }

}
