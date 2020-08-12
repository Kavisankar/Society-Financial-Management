package com.example.sfm.controller;

//import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.sfm.dao.DefaulterRepo;
import com.example.sfm.model.Defaulter;

@RestController
public class DefaulterController {
	@Autowired
	private DefaulterRepo defaulterRepo;

	@GetMapping("/defaulters")
	public List<Defaulter> retrieveAllDefaulters(){
		return defaulterRepo.findAll();
	}

	@GetMapping("/defaulters/id/{memberId}")
	public List<Defaulter> retrieveDefaulterById(@PathVariable Integer memberId){
		return defaulterRepo.findByDefaulterIdMemberId(memberId);
	}
	
	@GetMapping("/defaulters/{year}")
	public List<Defaulter> retrieveDefaulterByYear(@PathVariable Integer year){
		return defaulterRepo.findByDefaulterIdYear(year);
	}
	
	
	@GetMapping("/defaulters/{year}/{month}")
	public List<Defaulter> retrieveDefaulterByYear(@PathVariable Integer year, @PathVariable Integer month){
		return defaulterRepo.findByDefaulterIdYearAndDefaulterIdMonth(year, month);
	}
	
	/*
	@PostMapping("/defaulters")
	public ResponseEntity<Object> createDefaulter(@RequestBody Defaulter defaulter) {
		Defaulter savedDefaulter = defaulterRepo.save(defaulter);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedDefaulter.getDefaulterId()).toUri();

		return ResponseEntity.created(location).build();
	}
	*/
}
