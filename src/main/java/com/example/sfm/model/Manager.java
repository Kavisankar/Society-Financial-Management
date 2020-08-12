package com.example.sfm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "Managers")
@DynamicInsert
public class Manager {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "id")
	private Integer id;

	@Column(name = "Name", nullable = false)
	private String name;

	@Column(name = "Email", nullable = false)
	@Email
	private String email;

	@Column(name = "Mobile", nullable = false)
	@Pattern(regexp = "^[7-9][0-9]{9}$", message = "Invalid mobile number.")
	private String mobile;

	@Column(name = "Password", nullable = false)
	private String password;
	
	@Column(name = "Active_Status", columnDefinition = "TINYINT")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private Boolean activeStatus;

	public Manager() {
		super();
		this.activeStatus = true;
	}

	public Manager(String name, @Email String email,
			@Pattern(regexp = "^[7-9][0-9]{9}$", message = "Invalid mobile number.") String mobile, String password) {
		super();
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.password = password;
		this.activeStatus = true;
	}

	public Manager(Integer id, String name, @Email String email,
			@Pattern(regexp = "^[7-9][0-9]{9}$", message = "Invalid mobile number.") String mobile, String password,
			Boolean activeStatus) {
		this(name, email, mobile, password);
		this.id = id;
		this.activeStatus = activeStatus;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getActiveStatus() {
		return activeStatus;
	}

	public void setActiveStatus(Boolean activeStatus) {
		this.activeStatus = activeStatus;
	}

	@Override
	public String toString() {
		return "Manager [id=" + id + ", name=" + name + ", email=" + email + ", mobile=" + mobile + ", password="
				+ password + ", activeStatus=" + activeStatus + "]";
	}
	
	
	
}
