package com.example.sfm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "households")
public class Household {
	@Id
	@Column(name = "flatNo")
	private String flatNo;

	@Column(name = "member_id")
	private Integer memberId;

	public Household() {
		super();
	}

	public Household(String flatNo, Integer memberId) {
		super();
		this.flatNo = flatNo;
		this.memberId = memberId;
	}

	public String getflatNo() {
		return flatNo;
	}

	public void setflatNo(String flatNo) {
		this.flatNo = flatNo;
	}

	public Integer getMemberId() {
		return memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	@Override
	public String toString() {
		return "Household [flatNo=" + flatNo + ", memberId=" + memberId + "]";
	}

}
