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

import com.example.sfm.dao.MemberRepo;
import com.example.sfm.model.Member;

@RestController
public class MemberController {
	private static final Logger log = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberRepo memberRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@GetMapping("/members")
	public List<Member> retrieveAllMembers(){
		return memberRepo.findAll();
	}
	
	@GetMapping("/members/{id}")
	public Member retrieveMemberById(@PathVariable Integer id){
		Optional<Member> member = memberRepo.findById(id);
		
		if(!member.isPresent()) {
			throw new ResourceNotFoundException("Member not found for this id :: " + id);
		}
		
		return member.get();
	}
	

	@PostMapping(value = "/members/login")
	public Member login(@RequestBody Member memberDetails){
		log.info("Member login: " + memberDetails.getEmail());
		Member member = memberRepo.findByEmail(memberDetails.getEmail());
		if(member == null || !passwordEncoder.matches(memberDetails.getPassword(), member.getPassword())) {
			throw new ResourceNotFoundException("Invalid login credentials");
		}
		
		return member;
	}
	
	@PostMapping("/members")
	public ResponseEntity<Object> createMember(@RequestBody Member member) {
		Member presentMember = memberRepo.findByEmail(member.getEmail());
		
		if(presentMember != null) {
			HashMap<String, String> error = new HashMap<String, String>();
			error.put("error", "Email already exist.");
			return ResponseEntity.badRequest().body(error);
		}
		
		member.setPassword(passwordEncoder.encode(member.getPassword()));
		Member savedMember = memberRepo.save(member);
		
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedMember.getId()).toUri();

		return ResponseEntity.created(location).build();
	}
	
	@PutMapping("/members/{id}")
	public ResponseEntity<Object> updateMember(@PathVariable(value = "id") Integer memberId,
	  @Valid @RequestBody Member memberDetails) throws ResourceNotFoundException {
	     Member member = memberRepo.findById(memberId)
	     .orElseThrow(() -> new ResourceNotFoundException("Member not found for this id :: " + memberId));

	     member.setEmail(memberDetails.getEmail());
	     member.setName(memberDetails.getName());
	     member.setMobile(memberDetails.getMobile());
	     member.setPassword(memberDetails.getPassword());
	     member.setAmountToPay(memberDetails.getAmountToPay());
	     final Member updatedMember = memberRepo.save(member);
	     return ResponseEntity.ok(updatedMember);
	}
}
