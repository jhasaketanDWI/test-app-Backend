package in.org.genSpark.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.org.genSpark.model.RegistrationOtp;

@Repository
public interface RegistrationOtpRepository extends JpaRepository<RegistrationOtp, Long> {
	Optional<RegistrationOtp> findByEmailAndOtp(String email, String otp);

	Optional<RegistrationOtp> findByEmail(String email);
}
