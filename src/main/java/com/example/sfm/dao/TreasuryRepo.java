package com.example.sfm.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.sfm.model.Treasury;

@Repository
@Transactional
public interface TreasuryRepo extends JpaRepository<Treasury, Integer> {

}
