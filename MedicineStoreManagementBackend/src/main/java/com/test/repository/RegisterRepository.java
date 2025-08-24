package com.test.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.model.Register;

@Repository
public interface RegisterRepository extends JpaRepository<Register, Long>{

	Register findByEmailAndPassword(String email, String password);
	
	//List<Register> findByEmailAndPassword1(String email, String password);


}
