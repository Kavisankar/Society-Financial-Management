package com.example.sfm.model.ids;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class DefaulterId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "year", columnDefinition = "YEAR")
	private Integer year;

	@Column(name = "month", columnDefinition = "INT")
	private Integer month;

	@Column(name = "member_id")
	private Integer memberId;

	public DefaulterId() {
		super();
		LocalDate currentDate = LocalDate.now();
		this.month = currentDate.getMonthValue();
		this.year = currentDate.getYear();
	}

	public DefaulterId(Integer memberId) {
		this();
		this.memberId = memberId;
	}

	public DefaulterId(Integer year, Integer month, Integer memberId) {
		super();
		this.year = year;
		this.month = month;
		this.memberId = memberId;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getMemberId() {
		return memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "DefaulterId [year=" + year + ", month=" + month + ", memberId=" + memberId + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((memberId == null) ? 0 : memberId.hashCode());
		result = prime * result + ((month == null) ? 0 : month.hashCode());
		result = prime * result + ((year == null) ? 0 : year.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DefaulterId other = (DefaulterId) obj;
		if (memberId == null) {
			if (other.memberId != null)
				return false;
		} else if (!memberId.equals(other.memberId))
			return false;
		if (month != other.month)
			return false;
		if (year == null) {
			if (other.year != null)
				return false;
		} else if (!year.equals(other.year))
			return false;
		return true;
	}

}
