package in.org.genSpark.model;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "password_reset_tokens")
@Getter
@Setter
@NoArgsConstructor
public class PasswordResetToken {


	private static final int EXPIRATION_MINUTES = 15;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String token;

	// A token is associated with exactly one user.
	// FetchType.EAGER is acceptable here because when we load a token, we always
	// need the user.
	@OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = false, name = "user_id")
	private User user;

	@Column(nullable = false)
	private LocalDateTime expiryDate;

	/**
	 * Constructor to create a new token for a user. It automatically calculates the
	 * expiry date.
	 * 
	 * @param token The secure token string.
	 * @param user  The user this token belongs to.
	 */
	public PasswordResetToken(String token, User user) {
		this.token = token;
		this.user = user;
		this.expiryDate = LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES);
	}
}
