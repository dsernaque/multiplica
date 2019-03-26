package com.multiplica.examen.dto;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Curso {
	@Id
	private ObjectId _id;
	private String codigo;
	private String nombre;
	private String descripcion;
	private String anio;	
	private List<String> alumnos_ids;
	
	public String get_id() {
		if (_id != null)
			return _id.toHexString();
		return null;
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getAnio() {
		return anio;
	}
	public void setAnio(String anio) {
		this.anio = anio;
	}
	public List<String> getAlumnos_ids() {
		return alumnos_ids;
	}
	public void setAlumnos_ids(List<String> alumnos_ids) {
		this.alumnos_ids = alumnos_ids;
	}		
}
