package com.multiplica.examen.service;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multiplica.examen.dao.AlumnoDao;
import com.multiplica.examen.dao.CursoDao;
import com.multiplica.examen.dto.Alumno;
import com.multiplica.examen.dto.Curso;
import com.multiplica.examen.dto.Parametros;
import com.multiplica.examen.model.ModelResponse;
import com.multiplica.examen.util.Constantes;

@Service
public class CursoService {
	@Autowired
	private CursoDao cursoDao;
	
	@Autowired
	private AlumnoDao alumnoDao;
	
	public ModelResponse guardarCurso(Curso curso) {
		String idCurso = curso.get_id();	
		if (idCurso == null)
			curso.set_id(ObjectId.get());
		else
			curso.set_id(new ObjectId(idCurso));
		curso.setDescripcion(curso.getDescripcion().replaceAll("\\<.*?>",""));
		cursoDao.save(curso);
		ModelResponse response= new ModelResponse();
		response.setCodigo(Constantes.CODIGO_RESPUESTA_EXITO);
		response.setMensaje(Constantes.MENSAJE_RESPUESTA_EXITO);
		return response;
	}
	
	public ModelResponse obtenerCurso(ObjectId id) {
		Curso curso= cursoDao.findBy_id(id);
		ModelResponse response= new ModelResponse();
		response.setCodigo(Constantes.CODIGO_RESPUESTA_EXITO);
		response.setMensaje(Constantes.MENSAJE_RESPUESTA_EXITO);
		response.setCurso(curso);
		return response;
	}
	
	public ModelResponse listarCursos(){
		List<Curso> cursos = cursoDao.findAll();
		ModelResponse response= new ModelResponse();
		response.setCodigo(Constantes.CODIGO_RESPUESTA_EXITO);
		response.setMensaje(Constantes.MENSAJE_RESPUESTA_EXITO);
		response.setCursos(cursos);
		response.setCantRegistros(cursos.size());
		return response;
	}
	
	public ModelResponse eliminarCurso(ObjectId id) {
		cursoDao.delete(cursoDao.findBy_id(id));
		ModelResponse response= new ModelResponse();
		response.setCodigo(Constantes.CODIGO_RESPUESTA_EXITO);
		response.setMensaje(Constantes.MENSAJE_RESPUESTA_EXITO);
		return response;
	}
	
	public ModelResponse agregarAlumno(Parametros parametros ) {		
		Alumno alumno=alumnoDao.findBy_id(parametros.getIdAlumno());
		Curso curso=cursoDao.findBy_id(parametros.getIdCurso());
		curso.getAlumnos_ids().add(alumno.get_id());
		cursoDao.save(curso);
		ModelResponse response= new ModelResponse();
		response.setCodigo(Constantes.CODIGO_RESPUESTA_EXITO);
		response.setMensaje(Constantes.MENSAJE_RESPUESTA_EXITO);		
		return response;
	}
	
	public ModelResponse eliminarAlumno(Parametros parametros ) {		
		Alumno alumno=alumnoDao.findBy_id(parametros.getIdAlumno());
		Curso curso=cursoDao.findBy_id(parametros.getIdCurso());
		curso.getAlumnos_ids().remove(alumno.get_id());
		cursoDao.save(curso);	
		ModelResponse response= new ModelResponse();
		response.setCodigo(Constantes.CODIGO_RESPUESTA_EXITO);
		response.setMensaje(Constantes.MENSAJE_RESPUESTA_EXITO);		
		return response;
	}
	
	public ModelResponse listarAlumnos(ObjectId id) {	
		Curso curso=cursoDao.findBy_id(id);
		List<String> idsAlumnos = curso.getAlumnos_ids();
		Alumno  alumno;
		List<Alumno>  alumnos= new ArrayList<Alumno>();
		if (idsAlumnos != null){
			for (String idAlumno : idsAlumnos) {
				alumno= alumnoDao.findBy_id(new ObjectId(idAlumno));
				alumnos.add(alumno);
			}
		}
		ModelResponse response= new ModelResponse();
		response.setCodigo(Constantes.CODIGO_RESPUESTA_EXITO);
		response.setMensaje(Constantes.MENSAJE_RESPUESTA_EXITO);
		response.setAlumnos(alumnos);
		response.setCantRegistros(alumnos.size());
		return response;
	}
}
