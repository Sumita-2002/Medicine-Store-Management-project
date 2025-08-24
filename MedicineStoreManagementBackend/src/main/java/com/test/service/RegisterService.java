package com.test.service;

import com.test.model.Register;
import com.test.repository.RegisterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegisterService {

	@Autowired
    private RegisterRepository regRepo;

    public Register saveUser(Register reg) {
    	
    	reg.setName(reg.getName().toUpperCase());
    	
    	
    	reg.setCreatedOn(LocalDateTime.now());
		reg.setCreatedBy("SUMITA");
		
        return regRepo.save(reg);
    }

    public List<Register> getAllUsers() {
        return regRepo.findAll();
    }
    
    public Register getUserByEmailAndPassword(Register register) {    	
    	return regRepo.findByEmailAndPassword(register.getEmail(), register.getPassword());
    
    
    
    }

    
    
    
}


