package in.org.genSpark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.org.genSpark.model.InvestorVerification;

@Repository
public interface InvestorVerificationRepository extends JpaRepository<InvestorVerification, Long> {
	// This repository will be used by admins to manage the verification queue.
}
