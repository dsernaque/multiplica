import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Curso } from '../entity/Curso';
import { Alumno } from '../entity/Alumno';
import { CursosService } from './cursos.service';
import { RespuestaService } from '../entity/RespuestaService';
import { NotificationService } from '../core/components/notification/notification.service';
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
  selectedCurso: Curso;
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
  selectedAlumno: Alumno;
  displayModalAlumnos= false;
  nombresAlumno:string;
  apellidosAlumno:string;
  telefonoAlumno:string;
  fechaNacimientoAlumno:string;
  emailAlumno:string;
  direccionAlumno:string;
  titleModalAddAlumno:string;

  displayModalAddAlumno= false;
  constructor(
    private CursosService: CursosService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  loadSolicityLazy(params) {
    this.listarCursos(params);
  }

  listarCursos(params) { 
    this.isLoading = true;       
    this.showModalProgressBar();
    this.CursosService.getCursos().subscribe(
      data => {
        this.hideModalProgressBar();
        this.response = new RespuestaService(null, null, null,null,null);
        this.response = data;
        if (this.response.codigo=='1'){         
          this.rowsCursos = this.response.cursos;
          this.page.totalElements = this.response.cantRegistros;     
        } else {
          this.notificationService.notify('warn', 'Listar Cursos', 'Ocurrió un error.' );        
        }         
      },
      error => {
        this.hideModalProgressBar();
        this.notificationService.notify('error','Listar Cursos', 'Ocurrió un error');         
      }
    );
  }

  onSubmit(model) {   
    if (!model.codigo || !model.nombre || !model.descripcion|| !model.anio) {     
      this.notificationService.notify('warn', 'Campo requerido', 'Complete todos los campos');
    } else { 
      model._id= this.idCurso;
      model.alumnos_ids=this.alumnosCurso;       
      this.CursosService.saveCurso(model).subscribe(data => {          
      this.response = new RespuestaService(null, null, null,null,null);
      this.response = data;  
      if (this.response.codigo == '1') {      
        this.notificationService.notify('success', 'Registrar Curso', 'Datos grabados correctamente.');
        this.page.index = 0;
        this.displayModal = false;
        this.dataTableComponent.reset();
      }
      else {
        this.notificationService.notify('error', 'Registrar Curso', this.response.mensaje.toString());      
      }  
      },
      error => {
        this.notificationService.notify('error','Registrar Curso', 'Ocurrió un error');        
      }
      );
    }   
  }

  anular(row){   
    this.idCurso= row._id;
    this.confirmationService.confirm({
      message: 'Desea anular el curso?',
      header: 'Confirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.showModalProgressBar();
        this.CursosService.anularCurso(this.idCurso).subscribe(data => {
          this.hideModalProgressBar();
          this.response = new RespuestaService(null, null, null,null,null);
          this.response = data;
          if (this.response.codigo = '1'){
            this.notificationService.notify('success', 'Anular Curso', 'Se anuló el curso correctamente');         
            this.dataTableComponent.reset();          
          } else {
            this.notificationService.notify('error', 'Anular Curso', 'Ocurrio un error.');          
          }
        },
        error =>{
          this.hideModalProgressBar();
          this.notificationService.notify('error', 'Anular Curso', 'Ocurrio un error.');        
        });
      },
      reject: () => {          
      }
    });
  }

  verAlumnos(row){
    this.idCurso=row._id; 
    this.listarAlumnos();
    this.showModalAlumnos();
  }

  listarAlumnos() {     
    this.CursosService.getAlumnos(this.idCurso).subscribe(
      data => {      
        this.response = new RespuestaService(null, null, null,null,null);
        this.response = data;    
        if (this.response.codigo=='1'){         
          this.rowsAlumnos = this.response.alumnos;              
          this.page.totalElements = this.response.cantRegistros;    
          //this.showModalAlumnos();
        } else {
          this.notificationService.notify('warn', 'Listar Alumnos', 'Ocurrió un error.' );         
        }         
      },
      error => {
        this.hideModalProgressBar();
        this.notificationService.notify('error','Listar Alumnos', 'Ocurrió un error');            
      }
    );
  }

  eliminarAlumno(idAlumno: string){     
    this.showModalProgressBar();
    this.CursosService.eliminarAlumno(this.idCurso,idAlumno).subscribe(data => {
      this.hideModalProgressBar();
      this.response = new RespuestaService(null, null, null,null,null);
      this.response = data;
      if (this.response.codigo = '1'){
        this.notificationService.notify('success', 'Eliminar Alumno', 'Se eliminó al alumno del Curso ');    
       this.listarAlumnos();   
      } else {
        this.notificationService.notify('error', 'Eliminar Alumno', 'Ocurrio un error.');       
      }
    },
    error =>{
      this.hideModalProgressBar();
      this.notificationService.notify('error', 'Eliminar Alumno', 'Ocurrio un error.');     
    });
  }

  agregarAlumno(model) {   
    if (!model.nombres || !model.apellidos || !model.telefono|| !model.fechaNacimiento || !model.email|| !model.direccion) {     
      this.notificationService.notify('warn', 'Campo requerido', 'Complete todos los campos');
    } else {   
      this.CursosService.agregarAlumno(model,this.idCurso).subscribe(data => {          
      this.response = new RespuestaService(null, null, null,null,null);
      this.response = data;  
      if (this.response.codigo == '1') {      
        this.notificationService.notify('success', 'Agregar Alumno', 'Alumno registrado correctamente.');
        this.page.index = 0;
        this.displayModalAddAlumno = false;       
        this.listarAlumnos();      
        this.limpiar();   
      }
      else {
        this.notificationService.notify('error', 'Agregar Alumno', this.response.mensaje.toString());      
      }  
      },
      error => {
        this.notificationService.notify('error','Agregar Alumno', 'Ocurrió un error');        
      }
      );
    }   
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

  limpiar(){
    this.nombresAlumno='';
    this.apellidosAlumno='';
    this.telefonoAlumno='';
    this.fechaNacimientoAlumno='';
    this.emailAlumno='';
    this.direccionAlumno='';
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

  showModalAgregarAlumno() {    
    this.titleModalAddAlumno = 'Agregar Alumno';
    this.isPreview = false;
    this.displayModalAddAlumno = true;
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
