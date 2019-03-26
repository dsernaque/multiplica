import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaService } from '../entity/respuestaService';
@Injectable()
export class CursosService {  
  constructor(private http: HttpClient) { }
  urlMultiplica = environment.urlMultiplica;
  getCursos(desde: number, hasta: number) {
    let headers = new HttpHeaders();    
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    let params = new HttpParams();
    let url = `${this.urlMultiplica}/cursos/listar`;    
    return this.http.get<RespuestaService>(url);
  }

  saveCurso(data) {
    let headers = new HttpHeaders();    
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    let url = `${this.urlMultiplica}/cursos/guardar`;
    return this.http.post<RespuestaService>(url, data);
  }

  anularCurso(id: String) {
    let headers = new HttpHeaders();   
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    let url = `${this.urlMultiplica}/cursos/eliminar/${id}`;  
    return this.http.delete<RespuestaService>(url);
  }

  getAlumnos(id: String) {
    let headers = new HttpHeaders();    
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    let params = new HttpParams();
    let url = `${this.urlMultiplica}/cursos/listar-alumnos/${id}`;    
    return this.http.get<RespuestaService>(url);
  }

  eliminarAlumno(idCurso: string, idAlumno: string) {
    console.log("idCurso:" + idCurso);
    console.log("idAlumno:" + idAlumno);
    let headers = new HttpHeaders();   
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    let url = `${this.urlMultiplica}/cursos/eliminar-alumno`;
    let parametros = {
      'idCurso': idCurso,
      'idAlumno': idAlumno
    };
    return this.http.post<RespuestaService>(url, JSON.stringify(parametros), { headers: headers });
  }
}


