package com.multiplica.examen.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.multiplica.examen.dto.Curso;
import com.multiplica.examen.dto.Parametros;
import com.multiplica.examen.model.ModelResponse;
import com.multiplica.examen.service.CursoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/cursos")
public class CursoController {
	
	@Autowired
	private CursoService cursoService;
	
	@RequestMapping(value="/guardar", method= RequestMethod.POST)
	public ModelResponse guardarCurso(@RequestBody Curso curso) {
		return cursoService.guardarCurso(curso);
	}
	
	@RequestMapping(value="/obtener/{id}", method= RequestMethod.GET)
	public ModelResponse obtenerCurso(@PathVariable("id") ObjectId id) {
		return cursoService.obtenerCurso(id);
	}
	
	@RequestMapping(value="/listar", method= RequestMethod.GET)
	public ModelResponse listarCursos(){
		return cursoService.listarCursos();
	}
	
	@RequestMapping(value = "/eliminar/{id}", method = RequestMethod.DELETE)
	public ModelResponse eliminarCurso(@PathVariable("id") ObjectId id) {
		return cursoService.eliminarCurso(id);
	}
	
	@RequestMapping(value = "/agregar-alumno", method = RequestMethod.POST)
	public ModelResponse agregarAlumno(@RequestBody Parametros parametros ) {
		return cursoService.agregarAlumno(parametros);
	}
	
	@RequestMapping(value = "/eliminar-alumno", method = RequestMethod.POST)
	public ModelResponse eliminarAlumno(@RequestBody Parametros parametros ) {
		return cursoService.eliminarAlumno(parametros);
	}
	
	@RequestMapping(value = "/listar-alumnos/{id}", method = RequestMethod.GET)
	public ModelResponse listarAlumnos(@PathVariable("id") ObjectId id) {
		return cursoService.listarAlumnos(id);
	}
}
