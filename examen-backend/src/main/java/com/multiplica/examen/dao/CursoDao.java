package com.multiplica.examen.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.multiplica.examen.dto.Curso;

public interface CursoDao extends MongoRepository<Curso, String>{
	Curso findBy_id(ObjectId _id);
}
