package com.example.sfm.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "events_and_maintenance")
@DynamicInsert
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "starting_date")
	private Date startingDate;

	@Column(name = "ending_date")
	private Date endingDate;

	@Column(name = "expenditure")
	private Integer expenditure;

	public Event() {
		super();
	}

	public Event(String name, Date startingDate, Date endingDate, Integer expenditure) {
		super();
		this.name = name;
		this.startingDate = startingDate;
		this.endingDate = endingDate;
		this.expenditure = expenditure;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartingDate() {
		return startingDate;
	}

	public void setStartingDate(Date startingDate) {
		this.startingDate = startingDate;
	}

	public Date getEndingDate() {
		return endingDate;
	}

	public void setEndingDate(Date endingDate) {
		this.endingDate = endingDate;
	}

	public Integer getExpenditure() {
		return expenditure;
	}

	public void setExpenditure(Integer expenditure) {
		this.expenditure = expenditure;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", name=" + name + ", startingDate=" + startingDate + ", endingDate=" + endingDate
				+ ", expenditure=" + expenditure + "]";
	}

}
