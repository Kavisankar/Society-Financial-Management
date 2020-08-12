package com.example.sfm.dao;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.sfm.model.Defaulter;
import com.example.sfm.model.ids.DefaulterId;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto=validate"
})
class DefaulterRepoTest {
	@Autowired
	private DefaulterRepo defaulterRepo;
	
	@Test
	void test() {
		fail("Not yet implemented");
	}
	
	@Test
	void getAll() {
		List<Defaulter> defaulters = defaulterRepo.findAll();
		for(int i=0; i<defaulters.size(); i++) {
			System.out.println(defaulters.get(i));
		}
	}
	
	@Test
	void save() {
		Defaulter defaulter = new Defaulter(new DefaulterId(20));
		System.out.println(defaulter);
		defaulterRepo.save(defaulter);
		getAll();
	}

}
