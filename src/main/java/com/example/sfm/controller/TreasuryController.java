package com.example.sfm.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.sfm.dao.TreasuryRepo;
import com.example.sfm.model.Treasury;

@RestController
public class TreasuryController {
	@Autowired
	private TreasuryRepo treasuryRepo;
	
	@GetMapping("/treasury")
	public Treasury retriveTreasuryValue() {
		return treasuryRepo.findAll().get(0);
	}
	
	@PutMapping("/treasury")
	public Treasury updateTreasury(@Valid @RequestBody Treasury treasury) {
		System.out.println(treasury);
		return treasuryRepo.save(treasury);
	}

}
