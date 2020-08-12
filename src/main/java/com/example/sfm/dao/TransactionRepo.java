package com.example.sfm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.sfm.model.Transaction;

@Repository
@Transactional
public interface TransactionRepo extends JpaRepository<Transaction, Integer> {
	List<Transaction> findByTransferredBy(Integer transferredBy);
	List<Transaction> findByApprovedBy(Integer approvedBy);
}
