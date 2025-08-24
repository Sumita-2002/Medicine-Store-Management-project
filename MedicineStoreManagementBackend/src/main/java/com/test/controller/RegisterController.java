package com.test.controller;

import com.test.model.Register;
import com.test.service.RegisterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:3000", })
public class RegisterController {

	@Autowired
	private RegisterService regService;

	@PostMapping("/register") // etar final api url - /api/register
	public Register createUser(@RequestBody Register register) {
		
		return regService.saveUser(register);
	}

	@GetMapping("/getRegisterDetails")
	public List<Register> getAllUsers() {
		return regService.getAllUsers(); // ei dakho ekhane call hoche
	}

	@PostMapping("/login")
	public ResponseEntity<Register> checkLogin(@RequestBody Register register) {

		Register user = regService.getUserByEmailAndPassword(register);
		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

		}

	}
}

