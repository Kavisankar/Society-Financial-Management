package com.example.sfm.dao;

import java.util.List;

import javax.validation.constraints.Email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.sfm.model.Manager;

@Repository
@Transactional
public interface ManagerRepo extends JpaRepository<Manager, Integer> {
	Manager findByEmail(@Email String email);
	List<Manager> findByActiveStatus(Boolean activeStatus);
}
