package com.example.sfm.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.sfm.model.Event;

@Repository
@Transactional
public interface EventRepo extends JpaRepository<Event, Integer> {
	Event findByName(String name);

}
