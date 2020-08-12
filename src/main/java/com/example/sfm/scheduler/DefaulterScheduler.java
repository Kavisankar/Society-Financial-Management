package com.example.sfm.scheduler;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.sfm.dao.DefaulterRepo;
import com.example.sfm.dao.MemberRepo;
import com.example.sfm.model.Defaulter;
import com.example.sfm.model.ids.DefaulterId;

@Component
public class DefaulterScheduler {
	private static final Logger log = LoggerFactory.getLogger(DefaulterScheduler.class);

	@Autowired
	private MemberRepo memberRepo;
	
	@Autowired
	private DefaulterRepo defaulterRepo;
	
	@Scheduled(cron = "0 0 0 11 * *")
	private void updateDefaulters() {
		List<Integer> ids = memberRepo.findDefaulterIds();
		log.info(ids.size() + " Defaulters");
		for(int i=0; i<ids.size(); i++) {
			log.info(ids.get(i).toString());
			defaulterRepo.save(new Defaulter(new DefaulterId(ids.get(i))));
		}
	}
	
}
