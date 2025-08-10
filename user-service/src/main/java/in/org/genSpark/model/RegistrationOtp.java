package in.org.genSpark.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "registration_otps")
@Getter
@Setter
@NoArgsConstructor
public class RegistrationOtp {

	private static final int EXPIRATION_MINUTES = 10;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String otp;

	@Column(nullable = false)
	private LocalDateTime expiryDate;

	public RegistrationOtp(String email, String otp) {
		this.email = email;
		this.otp = otp;
		this.expiryDate = LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES);
	}
}