package com.example.sfm.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.sfm.dao.HouseholdRepo;
import com.example.sfm.model.Household;

@RestController
public class HouseholdController {
	@Autowired
	private HouseholdRepo householdRepo;

	@GetMapping("/households")
	public List<Household> retrieveAllHouseholds(){
		System.out.println(householdRepo.findAll().toString());
		return householdRepo.findAll();
	}
	
	@GetMapping("/households/{id}")
	public Household retrieveHouseholdById(@PathVariable String id){
		Optional<Household> household = householdRepo.findById(id);
		
		if(!household.isPresent()) {
			throw new ResourceNotFoundException("Household not found for this id :: " + id);
		}
		
		return household.get();
	}
	
	@PostMapping("/households")
	public ResponseEntity<Object> createHousehold(@RequestBody Household household) {
		System.out.println(household.toString());
		Household savedHousehold = householdRepo.save(household);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedHousehold.getflatNo()).toUri();

		return ResponseEntity.created(location).build();
	}
	
	@PutMapping("/households/{flatNo}")
	public ResponseEntity<Object> updateHousehold(@PathVariable(value = "flatNo") String householdId,
	  @Valid @RequestBody Household householdDetails) throws ResourceNotFoundException {
	     Household household = householdRepo.findById(householdId)
	     .orElseThrow(() -> new ResourceNotFoundException("Household not found for this id :: " + householdId));

	     household.setMemberId(householdDetails.getMemberId());
	     final Household updatedHousehold = householdRepo.save(household);
	     return ResponseEntity.ok(updatedHousehold);
	}
}
