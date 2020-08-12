package com.example.sfm.scheduler;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.sfm.dao.HouseholdRepo;
import com.example.sfm.dao.MemberRepo;
import com.example.sfm.dao.TreasuryRepo;
import com.example.sfm.model.Member;
import com.example.sfm.model.Treasury;

@Component
public class MonthlyUpdateScheduler {
	private static final Logger log = LoggerFactory.getLogger(MonthlyUpdateScheduler.class);

	@Autowired
	private MemberRepo memberRepo;

	@Autowired
	private HouseholdRepo householdRepo;

	@Autowired
	private TreasuryRepo treasuryRepo;

	@Scheduled(cron = "0 0 0 1 * *")
	private void updateMaintenanceAmount() {
		List<Integer> ids = householdRepo.findAllMemberIds();
		log.info("Total number of active members is" + ids.size());

		Treasury treasury = treasuryRepo.findAll().get(0);
		log.info(treasury.toString());

		Integer amountPerMember = (int) Math.ceil((double) treasury.getAmountNeeded() / ids.size());
		for (int i = 0; i < ids.size(); i++) {
			log.info(ids.get(i).toString());
			Member member = memberRepo.findById(ids.get(i)).get();

			member.setAmountToPay(member.getAmountToPay() + amountPerMember);

			memberRepo.save(member);
		}

	}
}
