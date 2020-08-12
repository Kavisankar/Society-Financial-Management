package com.example.sfm.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import com.example.sfm.model.ids.DefaulterId;

@Entity
@Table(name = "Defaulters")
@DynamicInsert
public class Defaulter{
	
	@EmbeddedId
	private DefaulterId defaulterId;

	public Defaulter() {
		super();
	}

	public Defaulter(DefaulterId defaulterId) {
		super();
		this.defaulterId = defaulterId;
	}

	public DefaulterId getDefaulterId() {
		return defaulterId;
	}

	public void setDefaulterId(DefaulterId defaulterId) {
		this.defaulterId = defaulterId;
	}

	@Override
	public String toString() {
		return "Defaulter [defaulterId=" + defaulterId + "]";
	}

}
