package com.multiplica.examen.dto;

import org.bson.types.ObjectId;

public class Parametros {
	
	private ObjectId idCurso;
	private ObjectId idAlumno;
	public ObjectId getIdCurso() {
		return idCurso;
	}
	public void setIdCurso(ObjectId idCurso) {
		this.idCurso = idCurso;
	}
	public ObjectId getIdAlumno() {
		return idAlumno;
	}
	public void setIdAlumno(ObjectId idAlumno) {
		this.idAlumno = idAlumno;
	}	
}
