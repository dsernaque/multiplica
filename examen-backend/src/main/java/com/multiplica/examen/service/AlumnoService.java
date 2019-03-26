package com.multiplica.examen.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multiplica.examen.dao.AlumnoDao;
import com.multiplica.examen.dto.Alumno;

@Service
public class AlumnoService {
	@Autowired
	private AlumnoDao alumnoDao;
	
	public Alumno crearAlumno(Alumno alumno) {
		alumno.set_id(ObjectId.get());
		alumnoDao.save(alumno);
		return alumno;
	}
	
	public Alumno obtenerAlumno(ObjectId id) {
		return alumnoDao.findBy_id(id);
	}
	
	public List<Alumno> listarAlumnos(){
		return alumnoDao.findAll();
	}
	
	public Alumno modificarAlumno(ObjectId id, Alumno alumno) {
		alumno.set_id(id);
		alumnoDao.save(alumno);
		return alumno;
	}
	
	public void eliminarAlumno(ObjectId id) {
		alumnoDao.delete(alumnoDao.findBy_id(id));
	}

}
