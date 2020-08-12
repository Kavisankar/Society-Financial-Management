package com.example.sfm.controller;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.sfm.dao.ManagerRepo;
import com.example.sfm.model.Manager;

@RestController
public class ManagerController {
	private static final Logger log = LoggerFactory.getLogger(ManagerController.class);
	
	@Autowired
	private ManagerRepo managerRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@GetMapping("/managers")
	public List<Manager> retrieveAllManagers(){
		return managerRepo.findAll();
	}
	
	@GetMapping("/managers/active")
	public List<Manager> retrieveActiveManagers(){
		return managerRepo.findByActiveStatus(true);
	}
	
	@GetMapping("/managers/{id}")
	public Manager retrieveManagerById(@PathVariable Integer id){
		Optional<Manager> manager = managerRepo.findById(id);
		
		if(!manager.isPresent()) {
			throw new ResourceNotFoundException("Manager not found for this id :: " + id);
		}
		
		return manager.get();
	}
	
	@PostMapping(value = "/managers/login")
	public Manager login(@RequestBody Manager managerDetails){
		log.info("Manager login: " + managerDetails.getEmail());
		Manager manager = managerRepo.findByEmail(managerDetails.getEmail());
		
		if(manager == null || !passwordEncoder.matches(managerDetails.getPassword(), manager.getPassword()) || !manager.getActiveStatus()) {
			throw new ResourceNotFoundException("Invalid login credentials");
		}
		
		return manager;
	}
	
	@PostMapping("/managers")
	public ResponseEntity<Object> createManager(@RequestBody Manager manager) {
		Manager presentManager = managerRepo.findByEmail(manager.getEmail());
		
		if(presentManager != null) {
			HashMap<String, String> error = new HashMap<String, String>();
			error.put("error", "Email already exist.");
			return ResponseEntity.badRequest().body(error);
		}

		manager.setPassword(passwordEncoder.encode(manager.getPassword()));
		Manager savedManager = managerRepo.save(manager);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedManager.getId()).toUri();

		return ResponseEntity.created(location).build();
	}
	
	@PutMapping("/managers/{id}")
	public ResponseEntity<Object> updateManager(@PathVariable(value = "id") Integer managerId,
	  @Valid @RequestBody Manager managerDetails) throws ResourceNotFoundException {
	     Manager manager = managerRepo.findById(managerId)
	     .orElseThrow(() -> new ResourceNotFoundException("Manager not found for this id :: " + managerId));

	     manager.setEmail(managerDetails.getEmail());
	     manager.setName(managerDetails.getName());
	     manager.setMobile(managerDetails.getMobile());
	     manager.setPassword(managerDetails.getPassword());
	     manager.setActiveStatus(managerDetails.getActiveStatus());
	     final Manager updatedManager = managerRepo.save(manager);
	     return ResponseEntity.ok(updatedManager);
	}
}
