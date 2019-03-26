package com.multiplica.examen.controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.multiplica.examen.dto.Alumno;
import com.multiplica.examen.service.AlumnoService;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/alumnos")
public class AlumnoController {	
	
	@Autowired
	private AlumnoService alumnoService;
	
	@RequestMapping(value="/crear", method= RequestMethod.POST)
	public Alumno crearAlumno(@RequestBody Alumno alumno) {
		return alumnoService.crearAlumno(alumno);
	}
	
	@RequestMapping(value="/obtener/{id}", method= RequestMethod.GET)
	public Alumno obtenerAlumno(@PathVariable("id") ObjectId id) {
		return alumnoService.obtenerAlumno(id);
	}
	
	@RequestMapping(value="/listar", method= RequestMethod.GET)
	public List<Alumno> listarAlumnos(){
		return alumnoService.listarAlumnos();
	}

	@RequestMapping(value = "/modificar/{id}", method = RequestMethod.PUT)
	public Alumno modificarAlumno(@PathVariable("id") ObjectId id, @RequestBody Alumno alumno) {
		return alumnoService.modificarAlumno(id, alumno);
	}
	
	@RequestMapping(value = "/eliminar/{id}", method = RequestMethod.DELETE)
	public void eliminarAlumno(@PathVariable("id") ObjectId id) {
		alumnoService.eliminarAlumno(id);
	}
}
