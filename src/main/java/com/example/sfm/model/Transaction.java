package com.example.sfm.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "transactions")
@DynamicInsert
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "transaction_time")
	private Timestamp transactionTime;
	
	@Column(name = "transferred_by")
	private Integer transferredBy;
	
	@Column(name = "approved_by")
	private Integer approvedBy;
	
	@Column(name = "amount")
	private Integer amount;

	public Transaction() {
		super();
	}

	public Transaction(Integer transferredBy, Integer approvedBy, Integer amount) {
		super();
		this.transferredBy = transferredBy;
		this.approvedBy = approvedBy;
		this.amount = amount;
		this.transactionTime =  new Timestamp(System.currentTimeMillis());
	}

	public Transaction(Integer id, Timestamp transactionTime, Integer transferredBy, Integer approvedBy,
			Integer amount) {
		super();
		this.id = id;
		this.transactionTime = transactionTime;
		this.transferredBy = transferredBy;
		this.approvedBy = approvedBy;
		this.amount = amount;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Timestamp getTransactionTime() {
		return transactionTime;
	}

	public void setTransactionTime(Timestamp transactionTime) {
		this.transactionTime = transactionTime;
	}

	public Integer getTransferredBy() {
		return transferredBy;
	}

	public void setTransferredBy(Integer transferredBy) {
		this.transferredBy = transferredBy;
	}

	public Integer getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(Integer approvedBy) {
		this.approvedBy = approvedBy;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", transactionTime=" + transactionTime + ", transferredBy=" + transferredBy
				+ ", approvedBy=" + approvedBy + ", amount=" + amount + "]";
	}
	
	

}
