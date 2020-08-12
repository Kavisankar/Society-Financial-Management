package com.example.sfm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.sfm.model.Defaulter;
import com.example.sfm.model.ids.DefaulterId;

@Repository
@Transactional
public interface DefaulterRepo extends JpaRepository<Defaulter, DefaulterId> {
	List<Defaulter> findByDefaulterIdYear(Integer year);
	List<Defaulter> findByDefaulterIdYearAndDefaulterIdMonth(Integer year, Integer month);
	List<Defaulter> findByDefaulterIdMemberId(Integer memberId);
}
