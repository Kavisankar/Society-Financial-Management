package com.example.sfm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Treasury")
public class Treasury {
	@Id
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "amount_having")
	private Integer amountHaving;
	
	@Column(name = "amount_needed")
	private Integer amountNeeded;

	public Treasury() {
		super();
		this.id = 1;
	}

	public Treasury(Integer id, Integer amountHaving, Integer amountNeeded) {
		super();
		this.id = id;
		this.amountHaving = amountHaving;
		this.amountNeeded = amountNeeded;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getAmountHaving() {
		return amountHaving;
	}

	public void setAmountHaving(Integer amountHaving) {
		this.amountHaving = amountHaving;
	}

	public Integer getAmountNeeded() {
		return amountNeeded;
	}

	public void setAmountNeeded(Integer amountNeeded) {
		this.amountNeeded = amountNeeded;
	}

	@Override
	public String toString() {
		return "Treasury [id=" + id + ", amountHaving=" + amountHaving + ", amountNeeded=" + amountNeeded + "]";
	}

	
}
