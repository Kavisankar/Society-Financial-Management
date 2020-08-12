package com.example.sfm.dao;

import java.util.List;

import javax.validation.constraints.Email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.sfm.model.Member;

@Repository
@Transactional
public interface MemberRepo extends JpaRepository<Member, Integer> {
	Member findByEmail(@Email String email);
	
	@Query("SELECT m.email FROM Member m WHERE m.id IN ?1 AND m.amountToPay != 0")
	List<String> findDefaultersEmailByIds(List<Integer> ids);
	
	@Query("SELECT m.id FROM Member m WHERE m.amountToPay != 0")
	List<Integer> findDefaulterIds();
}
