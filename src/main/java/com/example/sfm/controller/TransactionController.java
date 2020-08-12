package com.example.sfm.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.sfm.dao.TransactionRepo;
import com.example.sfm.model.Transaction;

@RestController
public class TransactionController {
	
	private static final Logger log = LoggerFactory.getLogger(TransactionController.class);
	
	@Autowired
	private TransactionRepo transactionRepo;

	@GetMapping("/transactions")
	public List<Transaction> retrieveAllTransactions(){
		System.out.println(transactionRepo.findAll().toString());
		return transactionRepo.findAll();
	}

	@GetMapping("/transactions/{id}")
	public Transaction retrieveTransactionById(@PathVariable Integer id){
		Optional<Transaction> transaction = transactionRepo.findById(id);
		
		if(!transaction.isPresent()) {
			throw new ResourceNotFoundException("Transaction not found for this id :: " + id);
		}
		
		return transaction.get();
	}
	
	@GetMapping("/transactions/member/{id}")
	public List<Transaction> retrieveTransactionByTransferredBy(@PathVariable Integer id){
		return transactionRepo.findByTransferredBy(id);
	}
	
	@GetMapping("/transactions/manager/{id}")
	public List<Transaction> retrieveTransactionByApprovedBy(@PathVariable Integer id){
		return transactionRepo.findByApprovedBy(id);
	}
	
	@PostMapping("/transactions")
	public ResponseEntity<Object> createTransaction(@RequestBody Transaction transaction) {
		log.info(transaction.toString());
		Transaction savedTransaction = transactionRepo.save(transaction);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedTransaction.getId()).toUri();

		return ResponseEntity.created(location).build();
	}
}
