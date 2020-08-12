package com.example.sfm.dao;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.sfm.model.Member;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto=validate"
})
class MemberRepoTest {
	@Autowired
	private MemberRepo memberRepo;

	@Test
	public void save() {
		Member member = new Member("Kavisankar N", "kavisankar.1702053@srit.org", "9629562321", "password");
		memberRepo.save(member);
		
		Member testMember = memberRepo.findByEmail("kavisankar.1702053@srit.org");

        assertNotNull(testMember);
        assertEquals(testMember.toString(), member.toString());
	}

}
