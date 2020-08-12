package com.example.sfm.scheduler;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.sfm.dao.HouseholdRepo;
import com.example.sfm.dao.MemberRepo;

@Component
public class EmailScheduler {
	private static final Logger log = LoggerFactory.getLogger(EmailScheduler.class);
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private HouseholdRepo householdRepo;
	
	@Autowired
	private MemberRepo memberRepo;
	

	@Scheduled(cron = "0 0 0 5-10 * *")
	private void sendReminderMail() {
		List<String> emails = memberRepo.findDefaultersEmailByIds(householdRepo.findDistinctMemberIds());
		log.info(emails.size() + " Defaulters");
		for(int i=0; i<emails.size(); i++) {
			log.info(emails.get(i));
		}
		
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(emails.toArray(new String[emails.size()]));
		msg.setSubject("eSociety monthly maintenance payment reminders");
		msg.setText("Description");
		
		javaMailSender.send(msg);
	}
}
