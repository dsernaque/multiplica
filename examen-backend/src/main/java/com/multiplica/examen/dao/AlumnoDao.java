package com.multiplica.examen.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.multiplica.examen.dto.Alumno;

public interface AlumnoDao extends MongoRepository<Alumno, String> {
	Alumno findBy_id(ObjectId _id);
}
