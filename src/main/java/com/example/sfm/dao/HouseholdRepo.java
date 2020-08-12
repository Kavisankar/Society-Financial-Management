package com.example.sfm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.sfm.model.Household;

@Repository
@Transactional
public interface HouseholdRepo extends JpaRepository<Household, String> {
	Household findByMemberId(Integer memberId);

	@Query("SELECT DISTINCT h.memberId from Household h")
	List<Integer> findDistinctMemberIds();
	
	@Query("SELECT h.memberId from Household h WHERE h.memberId IS NOT NULL")
	List<Integer> findAllMemberIds();

}
