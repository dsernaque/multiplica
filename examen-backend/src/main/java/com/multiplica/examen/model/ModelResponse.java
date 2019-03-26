package com.multiplica.examen.model;


import java.util.List;

import com.multiplica.examen.dto.Alumno;
import com.multiplica.examen.dto.Curso;

public class ModelResponse {
	private Integer codigo;
	private String mensaje;
	private Curso curso;
	private List<Curso> cursos;
	private List<Alumno> alumnos;
	private Integer cantRegistros;
	
	public Integer getCodigo() {
		return codigo;
	}
	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public List<Curso> getCursos() {
		return cursos;
	}
	public void setCursos(List<Curso> cursos) {
		this.cursos = cursos;
	}
	public Integer getCantRegistros() {
		return cantRegistros;
	}
	public void setCantRegistros(Integer cantRegistros) {
		this.cantRegistros = cantRegistros;
	}
	public Curso getCurso() {
		return curso;
	}
	public void setCurso(Curso curso) {
		this.curso = curso;
	}
	public List<Alumno> getAlumnos() {
		return alumnos;
	}
	public void setAlumnos(List<Alumno> alumnos) {
		this.alumnos = alumnos;
	}	
	
	
}
